import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {MoviePoster, SectionTitle} from 'src/components';
import colors from 'src/constants/colors';
import {NavigationHook} from 'src/types/NavigationType';
import {useSelector} from 'react-redux';
import {RootState} from 'src/store/store';

const Favourites = (): JSX.Element => {
  const navigation: NavigationHook = useNavigation();
  const {movies} = useSelector((state: RootState) => state.favourites);

  return (
    <SafeAreaView style={localStyles.container}>
      <View style={localStyles.topContainer}>
        <Ionicon
          onPress={() => navigation.goBack()}
          name="ios-arrow-back"
          size={24}
          color={colors.LIGHT}
        />
        <SectionTitle title="Favourites" />
        <View />
      </View>

      <FlatList
        data={movies}
        renderItem={({item}) => <MoviePoster style={{margin: 5}} item={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={localStyles.listContainer}
      />
    </SafeAreaView>
  );
};

export default Favourites;

export const localStyles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.DARK, padding: 10},
  listContainer: {gap: 10},
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
});
