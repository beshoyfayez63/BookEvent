export const eventsQuery = {
  query: `
    query {
      events {
        _id
        title
        price
        date
        description
        creator {
          _id
        }
      }
    }
  `,
};

export const loginQuery = (data) => {
  return {
    query: `
      query {
        login(email: "${data.email}", password: "${data.password}") {
          token
          userId
          tokenExpiration
        }
      }
    `,
  };
};

export const signupQuery = (data) => {
  return {
    query: `
      mutation {
        createUser(userInput: {email: "${data.email}", password: "${data.password}"}) {
          _id
          email
        }
      }
    `,
  };
};

export const createEventQuery = (eventData) => {
  return {
    query: `
      mutation {
        createEvent(eventInput: {title: "${eventData.title}",
        description: "${eventData.description}", 
        price: ${eventData.price}, 
        date: "${eventData.date}"}) {
        _id
        title
        description
        price
        date
        }
      }
    `,
  };
};
