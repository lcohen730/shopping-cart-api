const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    address: String,
    master: Boolean
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id }, 'souvenir')
    return token
}

const User = mongoose.model('User', userSchema);

module.exports = User