import { configureStore } from '@reduxjs/toolkit';

import eventReducer from './event/event-slice';

export default configureStore({
  reducer: {
    event: eventReducer,
  },
});
