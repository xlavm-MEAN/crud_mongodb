var express = require('express')
var cors = require('cors')
var path = require('path')
var bodyParser = require('body-parser')
const mongoose = require('mongoose') //indicamos que usaremos mongoose
var app = express() //indicamos el uso de express para nuestro middleware
var Machines = require('./routes/Machines')
var Invoices = require('./routes/Invoices')

var port = process.env.PORT || 3000 //indicamos el puerto donde correrá nuestra app
const mongoURI = 'mongodb://localhost:27017/ingeweb' //indicamos la dirección de nuestra base de datos

mongoose
    .connect(
        mongoURI, { useNewUrlParser: true } //realizamos la conexión con la BD
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

app.use(bodyParser.json());
app.use(cors());
app.use('/machines', Machines)
app.use('/invoices', Invoices)

app.listen(port, function() {
    console.log('Server is running on port: ' + port)
})