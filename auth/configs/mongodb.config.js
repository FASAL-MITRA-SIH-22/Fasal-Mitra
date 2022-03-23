const mongoose = require('mongoose');

var mongoConnect = mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, () => {
        console.log(`Auth-Service DB Connected`);
    })


mongoose.connection.on('connected', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Mongoose connected to db');
})

mongoose.connection.on('error', (err) => {
    console.log('error',err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})

module.exports = mongoConnect;