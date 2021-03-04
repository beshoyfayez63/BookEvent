const authResolver = require('./auth');
const eventResolver = require('./events');
const bookingResolver = require('./bookings');

const rootResolvers = {
  ...authResolver,
  ...eventResolver,
  ...bookingResolver,
};

module.exports = rootResolvers;
