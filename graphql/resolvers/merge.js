const User = require('../../models/user');
const Event = require('../../models/event');

const { dateToString } = require('../../helper/date');

const transformEvents = (event) => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    creator: userPopulate.bind(this, event._doc.creator),
  };
};

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    user: userPopulate.bind(this, booking._doc.user),
    event: eventPopulate.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

const eventsPopulate = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });

    return events.map((event) => {
      return transformEvents(event);
    });
  } catch (err) {
    throw err;
  }
};

const eventPopulate = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvents(event);
  } catch (err) {
    throw err;
  }
};

const userPopulate = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      password: null,
      createdEvent: eventsPopulate.bind(this, user._doc.createdEvent),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  transformEvents,
  transformBooking,
  userPopulate,
  eventPopulate,
};
