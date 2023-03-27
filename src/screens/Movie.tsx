import {SafeAreaView, StyleSheet} from 'react-native';
import {MovieCard} from 'src/components';
import colors from 'src/constants/colors';
import {NavigationType} from 'src/types/NavigationType';

const Movie = ({route}: NavigationType): JSX.Element => {
  const {item} = route.params;

  return (
    <SafeAreaView style={localStyles.container}>
      <MovieCard item={item} />
    </SafeAreaView>
  );
};

export default Movie;

export const localStyles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.DARK},
});
