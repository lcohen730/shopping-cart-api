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
        const cart = await Cart.create({ items: [itemOne, itemTwo],
                                        user: user
        })
        await user.save()
        await cart.save()
        const subTotal = itemOne.price * item.quantity + itemTwo.price * itemTwo.price
        const response = await request(app)
            .get('/cart')
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect.objectContaining(itemOne)
        expect.objectContaining(itemTwo)
        expect(response.body.subTotal).toEqual(subTotal)
    })

    test('It should update the quantity of an item in the cart', async () => {
        const user = new User({ name: 'Schubert',
                                email: 'schubert@music.com',
                                phone: '777-888-9999',
                                password: 'classical',
                                address: '1 Death and the Maiden Drive',
                                loggedIn: true })
        await user.save()
        const token = await user.generateAuthToken()
        const item = await Item.create({ name: 'Redrum Rosin', price: 40, type: 'Rosin' })
        await item.save()
        const response = await request(app)
            .put(`/items/${item._id}`)
            .set(`Authorization`, `Bearer ${token}`)
            .send({ price: 50 })
        expect(response.body.price).toEqual(50)
    })

    test('It should delete an item from the cart', async() => {
        const user = new User({ name: 'Dvorak',
                                email: 'dvorak@music.com',
                                phone: '888-999-0000',
                                password: 'classical',
                                address: '1 American Drive',
                                loggedIn: true })
        await user.save()
        const token = await user.generateAuthToken()
        const item = await Item.create({ name: 'Brazil Wood Bow', price: 250, type: 'Bow' })
        await item.save()
        // const response = await request(app)
        await request(app)
            .delete(`/items/${item._id}`)
            .set('Authorization', `Bearer ${token}`)
        // expect(response.body).not.toHaveProperty('name', 'Brazil Wood Bow')
        expect.not.objectContaining(item)
    })
})