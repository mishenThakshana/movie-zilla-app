import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {Favourites, Home, Movie, Search} from 'src/screens';
import routes from 'src/constants/routes';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name={routes.HOME} component={Home} />
      <Stack.Screen name={routes.MOVIE} component={Movie} />
      <Stack.Screen name={routes.SEARCH} component={Search} />
      <Stack.Screen name={routes.FAVOURITES} component={Favourites} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
