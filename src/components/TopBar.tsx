import {View, Text, StyleSheet} from 'react-native';
import colors from 'src/constants/colors';
import fonts from 'src/constants/fonts';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NavigationHook} from 'src/types/NavigationType';
import routes from 'src/constants/routes';

const TopBar = (): JSX.Element => {
  const navigation: NavigationHook = useNavigation();

  return (
    <View style={localStyles.titleContainer}>
      <Ionicon
        onPress={() => navigation.navigate(routes.FAVOURITES)}
        name="ios-heart-outline"
        size={25}
        color={colors.LIGHT}
      />
      <Text style={localStyles.title}>
        <Text style={{color: colors.PRIMARY}}>Movie</Text> Zilla
      </Text>
      <Ionicon
        onPress={() => navigation.navigate(routes.SEARCH)}
        name="ios-search-outline"
        size={25}
        color={colors.LIGHT}
      />
    </View>
  );
};
export default TopBar;

export const localStyles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontFamily: fonts.REGULAR,
    color: colors.LIGHT,
    fontSize: 30,
  },
});
