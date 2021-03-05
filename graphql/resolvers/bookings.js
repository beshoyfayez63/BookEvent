const Event = require('../../models/event');
const Booking = require('../../models/booking');
const { transformBooking, transformEvents } = require('./merge');

module.exports = {
  bookings: async (_, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('You should login to continue');
      }
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('You should login to continue');
      }
      const fetchedEvent = await Event.findById(args.eventId);
      const booking = new Booking({
        user: req.userId,
        event: fetchedEvent,
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (err) {
      throw err;
    }
  },
  cancelBooking: async ({ bookingId }, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('You should login to continue');
      }
      const booking = await Booking.findById(bookingId).populate('event');
      if (!booking) {
        throw new Error('Booking not found');
      }
      const event = transformEvents(booking.event);
      await Booking.deleteOne({ _id: bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};
