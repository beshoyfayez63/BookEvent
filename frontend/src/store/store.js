import { configureStore } from '@reduxjs/toolkit';

import eventReducer from './event/event-slice';
import userReducer from './user/user-slice';
import bookReducer from './booking/book-slice';

export default configureStore({
  reducer: {
    event: eventReducer,
    user: userReducer,
    book: bookReducer,
  },
});
