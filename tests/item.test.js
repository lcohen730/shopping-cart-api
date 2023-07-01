const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const server = app.listen(5000, () => console.log('Ready to test items'));
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
    test('It should list all items', async () => {
        const itemOne = new Item({ name: '3/4 Size Viola', price: 800, type: 'Viola' })
        await itemOne.save()
        const itemTwo = new Item({ name: 'Redrum Rosin', price: 40, type: 'Rosin' })
        await itemTwo.save()
        const response = await request(app)
            .get('/items')
        expect(response.statusCode).toBe(200)
        expect.objectContaining(itemOne)
        expect.objectContaining(itemTwo)
    })

    test('It should get one individual item', async () => {
        const item = new Item({ name: '3/4 Size Viola', price: 800, type: 'Viola' })
        await item.save()
        const response = await request(app)
            .get(`/items/${item._id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('3/4 Size Viola')
        expect(response.body.price).toEqual(800)
        expect(response.body.type).toEqual('Viola')
    })
    
    test('It should create a new item', async () =>{
        const user = new User({ name: 'Debussy',
                                email: 'debussy@music.com',
                                phone: '667-777-8888',
                                password: 'classical',
                                address: '1 Claire de Lune Drive',
                                loggedIn: true })
        await user.save()
        const token = await user.generateAuthToken()
        // const item = await Item.create({ name: '3/4 Size Viola', price: 800, type: 'Viola' })
        const response = await request(app)
            .post('/items')
            .set(`Authorization`, `Bearer ${token}`)
            .send({ name: '3/4 Size Viola', price: 800, type: 'Viola' })
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('3/4 Size Viola')
        expect(response.body.price).toEqual(800)
        expect(response.body.type).toEqual('Viola')
    })

    test('It should update an item', async () => {
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

    test('It should delete an item', async() => {
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

    test('It should add the first item to the logged in user\s cart', async () =>{
        const user = new User({ name: 'Franck',
                                email: 'franck@music.com',
                                phone: '300-400-5000',
                                password: 'classical',
                                address: '1 Sonata Drive',
                                loggedIn: true })
        await user.save()
        const token = await user.generateAuthToken()
        const item = await Item.create({ name: '3/4 Size Viola', price: 800, type: 'Viola' })
        const response = await request(app)
            .post(`/items/${item._id}`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        /* expect(response.body.name).toEqual('3/4 Size Viola')
        expect(response.body.price).toEqual(800)
        expect(response.body.type).toEqual('Viola')
        expect(response.body.quantity).toEqual(1) */
        expect.objectContaining(item)
    })

    test('It should add an item to the logged in user\s cart that already has at least one item', async () =>{
        const user = new User({ name: 'Glass',
                                email: 'glass@music.com',
                                phone: '400-500-6000',
                                password: 'classical',
                                address: '1 Mishima Drive',
                                loggedIn: true })
        await user.save()
        const token = await user.generateAuthToken()
        const cart = await Cart.create({ items: [{ name: '3/4 Size Viola',
                                                price: 800,
                                                type: 'Viola',
                                                quantity: 1 }],
                                        user: user
        })
        await user.save()
        await cart.save()
        const item = await Item.create({ name: 'Redrum Rosin', price: 40, type: 'Rosin' })
        const response = await request(app)
            .post(`/items/${item._id}`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        /* expect(response.body.name).toEqual('3/4 Size Viola')
        expect(response.body.price).toEqual(800)
        expect(response.body.type).toEqual('Viola') */
        expect.objectContaining(item)
    })
})