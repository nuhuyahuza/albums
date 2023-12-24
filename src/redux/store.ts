import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './albumSlice';
import photoReducer from './photoSlice';

const store = configureStore({
  reducer: {
    album: albumReducer,
    photo: photoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
