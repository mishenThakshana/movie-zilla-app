import {useEffect, useState} from 'react';
import {Alert, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {MoviePoster, SectionTitle, TopBar, Wrapper} from 'src/components';
import {TMDB_API_KEY} from '@env';
import {http} from 'src/tools/HttpHelper';
import {MovieInterface} from 'src/types/MovieType';
import colors from 'src/constants/colors';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<MovieInterface[]>([]);
  const [actionMovies, setActionMovies] = useState<MovieInterface[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<MovieInterface[]>([]);
  const [fantasyMovies, setFantasyMovies] = useState<MovieInterface[]>([]);

  useEffect(() => {
    initializeMovies();
  }, []);

  const fetchMovies = async (endpoint: string, params?: object) => {
    try {
      const response = await http.get(endpoint, {
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
          page: 1,
          ...params,
        },
      });
      return response.data.results.slice(0, 10);
    } catch (err) {
      Alert.alert('Error fetching movies');
      throw err;
    }
  };

  const initializeMovies = async () => {
    try {
      const [trendingMovies, actionMovies, horrorMovies, fantasyMovies] =
        await Promise.all([
          fetchMovies('/trending/movie/week'),
          fetchMovies('/discover/movie', {with_genres: 12}),
          fetchMovies('/discover/movie', {with_genres: 27}),
          fetchMovies('/discover/movie', {with_genres: 14}),
        ]);

      setTrendingMovies(trendingMovies);
      setActionMovies(actionMovies);
      setHorrorMovies(horrorMovies);
      setFantasyMovies(fantasyMovies);
    } catch (err) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={localStyles.container}>
      <TopBar />
      <Wrapper>
        <SectionTitle title="Trending Movies" />
        <FlatList
          data={trendingMovies}
          renderItem={({item}) => <MoviePoster item={item} />}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={localStyles.listContainer}
        />
        <SectionTitle title="Action Movies" />
        <FlatList
          data={actionMovies}
          renderItem={({item}) => <MoviePoster item={item} />}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={localStyles.listContainer}
        />
        <SectionTitle title="Horror Movies" />
        <FlatList
          data={horrorMovies}
          renderItem={({item}) => <MoviePoster item={item} />}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={localStyles.listContainer}
        />
        <SectionTitle title="Fantasy Movies" />
        <FlatList
          data={fantasyMovies}
          renderItem={({item}) => <MoviePoster item={item} />}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            localStyles.listContainer,
            {marginBottom: 20},
          ]}
        />
      </Wrapper>
    </SafeAreaView>
  );
};
export default Home;

export const localStyles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.DARK},
  listContainer: {gap: 10},
});
