import {configureStore} from '@reduxjs/toolkit';
import FavouriteSlice from './reducers/FavouriteSlice';

const store = configureStore({
  reducer: {
    favourites: FavouriteSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
