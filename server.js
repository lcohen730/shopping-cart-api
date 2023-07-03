require('dotenv').config()
const app = require('./app');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => console.log('Advance to MonGO. Collect $200.'))

app.listen(PORT, () => {
    console.log(`${PORT} points to Ravenclaw`)
})