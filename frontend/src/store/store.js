import { configureStore } from '@reduxjs/toolkit';

import eventReducer from './event/event-slice';
import userReducer from './user/user-slice';

export default configureStore({
  reducer: {
    event: eventReducer,
    user: userReducer,
  },
});
