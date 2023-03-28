import {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from 'src/constants/colors';
import {MovieInterface} from 'src/types/MovieType';
import Ionicon from 'react-native-vector-icons/Ionicons';
import fonts from 'src/constants/fonts';
import {serializeNumber} from 'src/utils/HelperFunctions';
import {NavigationHook} from 'src/types/NavigationType';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import SectionTitle from './SectionTitle';
import {API_KEY} from 'src/constants/app';
import {http} from 'src/tools/HttpHelper';
import MoviePoster from './MoviePoster';
import {useDispatch, useSelector} from 'react-redux';
import {addToFavourites} from 'src/store/reducers/FavouriteSlice';
import {RootState} from 'src/store/store';
import {useToast} from 'react-native-toast-notifications';

interface MovieCardInterface {
  item: MovieInterface;
}

const MovieCard = ({item}: MovieCardInterface): JSX.Element => {
  const toast = useToast();
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const {movies} = useSelector((state: RootState) => state.favourites);
  const {width, height} = Dimensions.get('screen');
  const navigation: NavigationHook = useNavigation();
  const [relatedMovies, setRelatedMovies] = useState<MovieInterface[]>([]);
  const [movieInFavourites, setMovieInFavourites] = useState<boolean>(false);

  useEffect(() => {
    http
      .get('/search/movie', {
        params: {
          api_key: API_KEY,
          query: item.title.split(' ')[0],
          page: 1,
        },
      })
      .then(res => setRelatedMovies(res.data.results))
      .catch(() => Alert.alert('Error', 'Something went wrong'));
  }, []);

  useEffect(() => {
    if (movies.find(movie => item.id === movie.id)) setMovieInFavourites(true);
    else setMovieInFavourites(false);
  }, [movies, item]);

  return (
    <ScrollView>
      <View style={{height, marginBottom: 50}}>
        <FastImage
          style={{height: height * 0.25, width}}
          source={{
            uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
          }}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[localStyles.actionBtn, {left: 10}]}>
          <Ionicon name="ios-arrow-back" size={24} color={colors.LIGHT} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (movies.find(movie => item.id === movie.id)) {
              dispatch(addToFavourites(item));
              toast.show('Removed from favourites', {
                duration: 2000,
              });
            } else {
              dispatch(addToFavourites(item));
              toast.show('Added to favourites', {
                duration: 2000,
              });
            }
          }}
          style={[localStyles.actionBtn, {right: 10}]}>
          <Ionicon
            name={movieInFavourites ? 'ios-heart' : 'ios-heart-outline'}
            size={24}
            color={movieInFavourites ? 'red' : colors.LIGHT}
          />
        </TouchableOpacity>

        <FastImage
          style={[
            localStyles.poster,
            {top: height * 0.25 - (Platform.OS === 'ios' ? 120 : 160)},
          ]}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          resizeMode="contain"
        />
        <View
          style={[
            localStyles.sideContentContainer,
            {top: height * 0.25 + 10, left: 0},
          ]}>
          <Text style={localStyles.sideContentLbl}>votes</Text>
          <Text style={localStyles.sideContentAmount}>
            {serializeNumber(item.vote_count)}
          </Text>
        </View>
        <View
          style={[
            localStyles.sideContentContainer,
            {top: height * 0.25 + 10, right: 0},
          ]}>
          <Text style={localStyles.sideContentLbl}>rating</Text>
          <Text style={localStyles.sideContentAmount}>
            {item.vote_average.toFixed(1)}
          </Text>
        </View>

        <View
          style={[
            localStyles.contentContainer,
            {top: height * 0.25 + (Platform.OS === 'ios' ? 140 : 100)},
          ]}>
          <Text style={localStyles.contentTitle}>{item.title}</Text>
          <Text style={localStyles.contentOverview}>{item.overview}</Text>
          <View style={{padding: 10}}>
            <SectionTitle title="You might like" />
            <FlatList
              data={relatedMovies}
              renderItem={({item}) => <MoviePoster item={item} />}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={localStyles.listContainer}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieCard;

export const localStyles = StyleSheet.create({
  actionBtn: {
    backgroundColor: colors.TRANSPARENT,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 10,
    borderRadius: 25,
    padding: 5,
  },
  poster: {
    height: 250,
    width: 180,
    position: 'absolute',
    alignSelf: 'center',
  },
  sideContentContainer: {
    position: 'absolute',
    paddingHorizontal: 20,
  },
  sideContentLbl: {
    fontFamily: fonts.REGULAR,
    color: colors.GRAY,
    fontSize: 12,
  },
  sideContentAmount: {
    fontFamily: fonts.REGULAR,
    color: colors.LIGHT,
    fontSize: 32,
  },
  contentContainer: {position: 'absolute', width: '100%'},
  contentTitle: {
    fontFamily: fonts.REGULAR,
    color: colors.LIGHT,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 5,
  },
  contentOverview: {
    textAlign: 'center',
    fontFamily: fonts.REGULAR,
    color: colors.GRAY,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  listContainer: {gap: 10},
});
