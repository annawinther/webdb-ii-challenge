
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          vin: '1GNEK13ZX3R298984,',
          make: 'Toyota',
          model: 'Yaris',
          mileage: 'Test',
          transmission_type: 'Auto',
          transmission_style: 'Clean'
        },
      ]);
    });
};
