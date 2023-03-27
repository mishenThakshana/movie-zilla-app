import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MovieInterface} from 'src/types/MovieType';

interface PayloadInterface {
  movies: MovieInterface[];
}

export const initialState: PayloadInterface = {
  movies: [],
};

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<MovieInterface>) => {
      const movieToAdd = action.payload;
      if (state.movies.find(movie => movie.id === movieToAdd.id)) {
        state.movies.splice(
          state.movies.findIndex(movie => movie.id === movieToAdd.id),
          1,
        );
      } else {
        state.movies = [...state.movies, movieToAdd];
      }
      AsyncStorage.setItem('favourites', JSON.stringify(state.movies));
    },
    setFavourites: (state, action: PayloadAction<MovieInterface[]>) => {
      state.movies = action.payload;
    },
  },
});

export const {addToFavourites, setFavourites} = favouriteSlice.actions;
export default favouriteSlice.reducer;
