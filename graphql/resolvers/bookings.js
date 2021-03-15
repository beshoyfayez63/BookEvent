const Event = require('../../models/event');
const Booking = require('../../models/booking');
const { transformBooking, transformEvents } = require('./merge');

module.exports = {
  bookings: async (_, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('You should login to continue');
      }
      const bookings = await Booking.find({ user: req.userId });
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
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      const isBookEvent = await Booking.findOne({
        event: args.eventId,
        user: req.userId,
      });
      if (isBookEvent) {
        throw new Error('You already booked this event');
      }

      const booking = new Booking({
        user: req.userId,
        event: fetchedEvent._id,
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (err) {
      console.log('Book Event', err);
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
  isEventBooked: async ({ eventId }, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('You should login to continue');
      }
      let isBooked = false;
      const isBookedEvent = await Booking.findOne({
        event: eventId,
        user: req.userId,
      });
      if (isBookedEvent) {
        isBooked = true;
      } else isBooked = false;
      return isBooked;
    } catch (err) {
      throw err;
    }
  },
};
