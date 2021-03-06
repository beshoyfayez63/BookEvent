const Event = require('../../models/event');
const User = require('../../models/user');
const { transformEvents } = require('./merge');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => transformEvents(event));
    } catch (err) {
      console.log('Events', err);
      throw err;
    }
  },

  createEvent: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('You should login to continue');
      }
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: req.userId,
      });
      const eventCreated = await event.save();
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error('User does not exist');
      }
      user.createdEvent.push(event);
      await user.save();
      return transformEvents(eventCreated);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
