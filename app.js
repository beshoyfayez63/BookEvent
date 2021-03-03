const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Event = require('./models/event');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }
      type User {
        _id: ID!
        email: String!
        password: String
      }

      input EventInput {
        title: String!
        description: String! 
        price: Float!
        date: String!
      }
      input UserInput {
        email: String!
        password: String!
      }

      type RootQuery {
        events: [Event!]!
      }
      type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
      }
      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: async () => {
        try {
          const events = await Event.find();
          return events.map((event) => ({ ...event._doc }));
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
          const result = await event.save();
          const user = await User.findById('603f19e5680235f3b03f410c');
          if (!user) {
            throw new Error('User does not exist');
          }
          user.createdEvent.push(event);
          await user.save();
          return {
            ...result._doc,
          };
        } catch (err) {
          console.logl(err);
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
    },
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.irteb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(3000, () => {
      console.log('LISTEN');
    });
  })
  .catch((err) => {
    console.log(err);
  });
