const express = require('express')
const app = express()
const machinesRoutes = express.Router()

let Machine = require('../models/Machine')

// Adding new data
machinesRoutes.route('/add').post((req, res) => {
    let machine = new Machine(req.body);
    machine.save().then(machine => {
            res.status(200).json({ 'machine': 'machine is added successfully' });
        })
        .catch(err => {
            res.status(400).send('Unable to add  machine to database')
        });
});

//Getting all stored data
machinesRoutes.route('/').get((req, res) => {
    Machine.find(function(err, machine) {
        if (machine) {
            res.json(machine);
        } else {
            console.log(err);
        }
    });
});


// Editing the data 
machinesRoutes.route('/edit/:id').get((req, res) => {
    let id = req.params.id;
    Machine.findById(id, (err, machine) => {
        res.json(machine);
    });
});

// Updating the data
machinesRoutes.route('/update/:id').post((req, res) => {
    Machine.findById(req.params.id, (err, machine) => {
        if (!machine) {
            return next(new Error('Could not load the document'));
        } else {
            machine.serial = req.body.serial;
            machine.brand = req.body.brand;
            machine.model = req.body.model;
            machine.ubication = req.body.ubication;
            machine.price_shopping = req.body.price_shopping;
            machine.receipt_shopping = req.body.receipt_shopping;
            machine.creation_date = req.body.creation_date;
            machine.sale_date = req.body.sale_date;
            machine.seller_identification = req.body.seller_identification;
            machine.state = req.body.state;

            machine.save().then(machine => {
                    res.json('Data Updated Successfully');
                })
                .catch(err => {
                    res.status(400).send('Unable to update the database');
                });
        }
    });
});

// Deleting the data
machinesRoutes.route('/delete/:id').get((req, res) => {
    let id = req.params.id;
    Machine.findByIdAndDelete(id, (err, machine) => {
        if (err) {
            res.json(err)
        } else {
            res.json('Data Removed Successfully');
        }
    });
});

module.exports = machinesRoutes