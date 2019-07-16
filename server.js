const express = require('express');

const server = express();
const db = require('./data/dbConfig.js');

server.use(express.json());

function getAllCars() {
    return db('cars');
}

function createNewCar({ vin, make, model, mileage, transmission_type, transmission_style }){
    return db('cars').insert({ vin, make, model, mileage, transmission_type, transmission_style })
}

server.get('/users', async (req, res) => {
    try {
        const cars = await getAllCars();
        res.status(200).json(cars)
    } catch {
        res.status(500).json({message: 'could not get all cars' })
    }
})

server.post('/cars', async (req, res) => {
    try {
        // const carsData = req.body;
        const car = await createNewCar(req.body)
        res.status(201).json(car);
    } catch {
        res.status(500).json({ message: 'could not create new car' })
    }
})




server.get('/', async (req, res, next) => {
  try {
    res.json('success');
  } catch (error) {
    next(new Error('argh!'));
  }
});

server.use((err, req, res, next) => { // eslint-disable-line
  console.error('ERROR:', err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;