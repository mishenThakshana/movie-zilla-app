import {useNavigation} from '@react-navigation/native';
import {useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  FlatList,
  Platform,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {MoviePoster, SectionTitle} from 'src/components';
import {TMDB_API_KEY} from '@env';
import colors from 'src/constants/colors';
import fonts from 'src/constants/fonts';
import {http} from 'src/tools/HttpHelper';
import {MovieInterface} from 'src/types/MovieType';
import {NavigationHook} from 'src/types/NavigationType';
import debounce from 'lodash.debounce';

const Search = (): JSX.Element => {
  const navigation: NavigationHook = useNavigation();
  const [keyword, setKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MovieInterface[]>([]);

  const delayedSearchMovie = debounce((keyword: string) => {
    if (keyword !== '')
      http
        .get('/search/movie', {
          params: {
            api_key: TMDB_API_KEY,
            query: keyword,
            page: 1,
          },
        })
        .then(res => setSearchResults(res.data.results))
        .catch(() => Alert.alert('Error', 'Something went wrong'));
  }, 1000);

  const searchMovie = useCallback((keyword: string) => {
    setKeyword(keyword);
    delayedSearchMovie(keyword);
  }, []);

  return (
    <SafeAreaView style={localStyles.container}>
      <View style={localStyles.wrapper}>
        <FlatList
          initialNumToRender={10}
          data={searchResults}
          renderItem={({item}) => (
            <MoviePoster style={{margin: 5}} item={item} />
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={localStyles.listContainer}
          ListHeaderComponent={
            <>
              <Ionicon
                onPress={() => navigation.goBack()}
                name="ios-arrow-back"
                size={24}
                color={colors.LIGHT}
              />
              <View style={localStyles.searchContainer}>
                <Ionicon
                  name="ios-search-outline"
                  size={24}
                  color={'#535353'}
                />
                <TextInput
                  onChangeText={(value: string) => searchMovie(value)}
                  placeholder="Search movie"
                  placeholderTextColor={'#535353'}
                  style={localStyles.searchInput}
                  selectionColor={colors.PRIMARY}
                  autoCorrect={false}
                  autoCapitalize="none"
                  value={keyword}
                />
              </View>
              <SectionTitle title={`Search results for: ${keyword}`} />
            </>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;

export const localStyles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.DARK},
  wrapper: {padding: 10},
  listContainer: {gap: 10},
  searchContainer: {
    backgroundColor: '#383433',
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: Platform.OS === 'ios' ? 10 : 5,
    borderRadius: 25,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.REGULAR,
    color: colors.LIGHT,
  },
});
