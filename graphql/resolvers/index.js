const bcrypt = require('bcrypt');
const Event = require('../../models/event');
const User = require('../../models/user');

const eventsPopulate = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });

    return events.map((event) => {
      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: userPopulate.bind(this, event._doc.creator),
      };
    });
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
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => ({
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: userPopulate.bind(this, event._doc.creator),
      }));
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createEvent: async (args) => {
    try {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '603f19e5680235f3b03f410c',
      });
      const eventCreated = await event.save();
      const user = await User.findById('603f19e5680235f3b03f410c');
      if (!user) {
        throw new Error('User does not exist');
      }
      user.createdEvent.push(event);
      await user.save();
      return {
        ...eventCreated._doc,
        creator: userPopulate.bind(this, eventCreated._doc.creator),
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async ({ userInput }) => {
    const existedUser = await User.findOne({ email: userInput.email });
    if (existedUser) {
      throw new Error('User exist already');
    }
    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      password: hashedPassword,
    });
    await user.save();
    return { ...user._doc, password: null };
  },
};
