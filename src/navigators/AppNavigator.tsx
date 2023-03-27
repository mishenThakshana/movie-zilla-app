import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import colors from 'src/constants/colors';
import {setFavourites} from 'src/store/reducers/FavouriteSlice';
import HomeNavigator from './HomeNavigator';

const AppNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initializeFavourites();
  }, []);

  const initializeFavourites = async () => {
    const favourites = await AsyncStorage.getItem('favourites');
    if (favourites) {
      dispatch(setFavourites(JSON.parse(favourites)));
    }
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={colors.DARK} />
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
