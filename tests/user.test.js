const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const server = app.listen(8080, () => console.log('Ready to test users'));
const User = require('../models/user');
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

describe('Test the users endpoints', () => {
    test('It should list all users', async () => {
        const userOne = new User({ name: 'Mahler',
                                email: 'mahler@music.com',
                                phone: '999-000-1111',
                                password: 'classical',
                                address: '1 Symphony No.2 Drive' })
        await userOne.save()
        const userTwo = new User({ name: 'Faure',
                                email: 'faure@music.com',
                                phone: '100-200-3000',
                                password: 'classical',
                                address: '1 Pavane Drive' })
        await userTwo.save()
        const response = await request(app)
            .get('/users')
        expect(response.statusCode).toBe(200)
        expect.objectContaining(userOne)
        expect.objectContaining(userTwo)
    })

    test('It should get one individual user', async () => {
        const user = new User({ name: 'Grieg',
                                email: 'grieg@music.com',
                                phone: '200-300-4000',
                                password: 'classical',
                                address: '1 Mountain King Drive' })
        await user.save()
        const response = await request(app)
            .get(`/users/${user._id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Grieg')
        expect(response.body.email).toEqual('grieg@music.com')
        expect(response.body.phone).toEqual('200-300-4000')
        expect(response.body.address).toEqual('1 Mountain King Drive')
        // expect(response.body.loggedIn).toEqual(false) // check to see if Boolean instead?
    })
    
    test('It should create a new user', async () =>{
        const response = await request(app)
            .post('/users')
            .send({ name: 'Tchaikovsky',
                    email: 'tchaikovsky@music.com',
                    phone: '111-222-3333',
                    password: 'classical',
                    address: '1 Souvenir de Florence Drive'})
        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Tchaikovsky')
        expect(response.body.user.email).toEqual('tchaikovsky@music.com')
        expect(response.body.user.phone).toEqual('111-222-3333')
        expect(response.body.user.address).toEqual('1 Souvenir de Florence Drive')
        expect(response.body.user.loggedIn).toEqual(false)
        expect(response.body).toHaveProperty('token')
    })

    test('It should login a user', async () => {
        const user = new User({ name: 'Brahms',
                                email: 'brahms@music.com',
                                phone: '222-333-4444',
                                password: 'classical',
                                address: '1 Lullaby Drive' })
        await user.save()
        const response = await request(app)
            .post('/users/login')
            .send({ email: 'brahms@music.com', password: 'classical'})
        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Brahms')
        expect(response.body.user.email).toEqual('brahms@music.com')
        expect(response.body.user.loggedIn).toEqual(true)
        expect(response.body).toHaveProperty('token')
    })

    test('It should update a user', async () => {
        const user = new User({ name: 'Elgar',
                                email: 'elgar@music.com',
                                phone: '333-444-5555',
                                password: 'classical',
                                address: '1 Enigma Drive',
                                loggedIn: true })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .put(`/users/${user._id}`)
            .set(`Authorization`, `Bearer ${token}`)
            .send({ name: 'Edward Elgar'})
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Edward Elgar')
    })

    test('It should log out a user', async() => {
        const user = new User({ name: 'Beethoven',
                                email: 'beethoven@music.com',
                                phone: '444-555-6666',
                                password: 'classical',
                                address: '1 Symphony Drive',
                                loggedIn: true })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .post(`/users/logout`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.body.name).toEqual('Beethoven')
        expect(response.body.loggedIn).toEqual(false)
    })

    test('It should delete a user', async() => {
        const user = new User({ name: 'Mozart',
                                email: 'mozart@music.com',
                                phone: '555-667-7777',
                                password: 'classical',
                                address: '1 Eine Kleine Drive',
                                loggedIn: true })
        await user.save()
        const token = await user.generateAuthToken()
        // const response = await request(app)
        await request(app)
            .delete(`/users/${user._id}`)
            .set('Authorization', `Bearer ${token}`)
        // expect(response.statusCode).toBe(200)
        // expect(response.body).not.toHaveProperty('name', 'Mozart')
        expect.not.objectContaining(user)
    })
})