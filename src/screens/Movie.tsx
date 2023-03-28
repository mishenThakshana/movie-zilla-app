import {SafeAreaView, StyleSheet, View} from 'react-native';
import {MovieCard} from 'src/components';
import colors from 'src/constants/colors';
import {NavigationType} from 'src/types/NavigationType';

const Movie = ({route}: NavigationType): JSX.Element => {
  const {item} = route.params;

  return (
    <View style={localStyles.container}>
      <MovieCard item={item} />
    </View>
  );
};

export default Movie;

export const localStyles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.DARK},
});
