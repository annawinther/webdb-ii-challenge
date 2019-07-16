const express = require('express');

const server = express();
const db = require('./data/dbConfig.js');

server.use(express.json());

function getAllCars() {
    return db('cars');
}

function getCarById(id){
    return db('cars').where({ id });
}

function createNewCar({ vin, make, model, mileage, transmission_type, transmission_style }){
    return db('cars').insert({ vin, make, model, mileage, transmission_type, transmission_style })
}

server.get('/cars', async (req, res) => {
    try {
        const cars = await getAllCars();
        res.status(200).json(cars)
    } catch (error) {
        res.status(500).json({message: 'could not get all cars' })
    }
})

server.get('/cars/:id', async (req, res) => {
    try {
        const id  = req.params.id;
        const car = await getCarById(id);
        if (id) {
            res.status(200).json(car[0])
        } else {
            res.status(404).json({ message: 'car with that id is not found' })
        }
        // res.status(200).json(car)
    } catch (error) {
        res.status(500).json({ message: 'could not get car by id' })
    }
})
server.post('/cars', async (req, res) => {
    try {
        // const carsData = req.body;
        const createdCarId = await createNewCar(req.body);
        const newCar = await getCarById(createdCarId[0]);
        res.status(201).json(newCar[0]);
    } catch (error) {
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