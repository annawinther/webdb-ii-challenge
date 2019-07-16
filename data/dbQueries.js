const db = require('./dbConfig');

module.exports = {
    getAllCars,
    getCarById,
    createNewCar,
    deleteCar,
    updateCar
}
function getAllCars() {
    return db('cars');
}

function getCarById(id){
    return db('cars').where({ id }).first();
}

function createNewCar({ vin, make, model, mileage, transmission_type, transmission_style }){
    return db('cars').insert({ vin, make, model, mileage, transmission_type, transmission_style })
}

function deleteCar(id){
    return db('cars').where({ id }).del();
}

function updateCar(id, { vin, make, model, mileage, transmission_type, transmission_style }){
    return db('cars').where({ id }).update({ vin, make, model, mileage, transmission_type, transmission_style });
}

