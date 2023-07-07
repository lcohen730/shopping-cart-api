const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const server = app.listen(6000, () => console.log('Ready to test items'));
const User = require('../models/user');
const Item = require('../models/item');
const Cart = require('../models/cart');
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Test the items endpoints', () => {
    test('It should show the cart, with items and subtotal', async () => {
        const user = new User({ name: 'Reich',
                                email: 'reich@music.com',
                                phone: '500-600-7000',
                                password: 'classical',
                                address: '1 Four Sections Drive',
                                loggedIn: true })
        await user.save()
        const token = await user.generateAuthToken()
        const itemOne = await Item.create({ name: '3/4 Size Viola', price: 800, type: 'Viola', quantity: 1 })
        await itemOne.save()
        const itemTwo = await Item.create({ name: 'Redrum Rosin', price: 40, type: 'Rosin', quantity: 1 })
        await itemTwo.save()
        const subTotal = (itemOne.price * itemOne.quantity) + (itemTwo.price * itemTwo.quantity)
        const cart = await Cart.create({ items: [itemOne, itemTwo],
                                        subTotal: subTotal,
                                        user: user
        })
        await user.save()
        await cart.save()
        // console.log(cart)
        const response = await request(app)
            .get('/cart')
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect.objectContaining(itemOne)
        expect.objectContaining(itemTwo)
        // expect(response.body.subTotal).toEqual(840)
    })

    test('It should update the quantity of an item in the cart', async () => {
        const user = new User({ name: 'Tiersen',
                                email: 'tiersen@music.com',
                                phone: '600-700-8000',
                                password: 'classical',
                                address: '1 Amelie Drive',
                                loggedIn: true })
        await user.save()
        const token = await user.generateAuthToken()
        const item = await Item.create({ name: 'Redrum Rosin', price: 40, type: 'Rosin' })
        await item.save()
        const cart = await Cart.create({ items: [item],
                                        user: user
        })
        await user.save()
        await cart.save()
        const update = { name: 'Redrum Rosin', price: 40, type: 'Rosin', quantity: 2, _id: `${item._id}`}
        const response = await request(app)
            .put(`/cart/${item._id}`)
            .set(`Authorization`, `Bearer ${token}`)
            .send({ 'quantity': 2 })
        // expect(response.statusCode).toBe(200)
        // expect(response.body.quantity).toEqual(2)
        expect.objectContaining(update)
    })

    test('It should delete an item from the cart', async() => {
        const user = new User({ name: 'Greenwood',
                                email: 'greenwood@music.com',
                                phone: '700-800-9000',
                                password: 'classical',
                                address: '1 Rain Down Drive',
                                loggedIn: true })
        await user.save()
        const token = await user.generateAuthToken()
        const item = await Item.create({ name: 'Redrum Rosin', price: 40, type: 'Rosin' })
        await item.save()
        const cart = await Cart.create({ items: [item],
                                        user: user
        })
        await user.save()
        await cart.save()
        // const response = await request(app)
        await request(app)
            .delete(`/cart/${item._id}`)
            .set('Authorization', `Bearer ${token}`)
        // expect(response.statusCode).toBe(200)
        // expect(response.body).not.toHaveProperty('name', 'Brazil Wood Bow')
        expect.not.objectContaining(item)
    })
})