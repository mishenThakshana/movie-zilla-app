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

  const initializeMovies = async () => {
    try {
      const trendingMovies = await http.get('/trending/movie/week', {
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
          page: 1,
        },
      });

      setTrendingMovies(trendingMovies.data.results.slice(0, 10));

      const actionMovies = await http.get('/discover/movie', {
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
          page: 1,
          with_genres: 12,
        },
      });

      setActionMovies(actionMovies.data.results.slice(0, 10));

      const horrorMovies = await http.get('/discover/movie', {
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
          page: 1,
          with_genres: 27,
        },
      });

      setHorrorMovies(horrorMovies.data.results.slice(0, 10));

      const fantasyMovies = await http.get('/discover/movie', {
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
          page: 1,
          with_genres: 14,
        },
      });

      setFantasyMovies(fantasyMovies.data.results.slice(0, 10));
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
