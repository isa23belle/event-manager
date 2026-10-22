const Event = require('./Event');
const Registration = require('./Registration');

Event.hasMany(Registration, { foreignKey: 'eventId' });
Registration.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = { Event, Registration };