const DataLoader = require('dataloader');
const User = require('../../models/user');
const Event = require('../../models/event');

const { dateToString } = require('../../helper/date');

const eventLoader = new DataLoader((eventIds) => {
  return eventsPopulate(eventIds);
});

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const transformEvents = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: userPopulate.bind(this, event._doc.creator),
  };
};

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
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
    const event = await eventLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};

const userPopulate = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      password: null,
      createdEvent: () => eventLoader.loadMany(user._doc.createdEvent),
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
