import {useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {IMAGE_URL} from 'src/tools/HttpHelper';
import {MovieInterface} from 'src/types/MovieType';
import {useNavigation} from '@react-navigation/native';
import {NavigationHook} from 'src/types/NavigationType';
import routes from 'src/constants/routes';
import SkeletonLoader from './SkeletonLoader';

interface MoviePosterInterface {
  item: MovieInterface;
  style?: any;
}

const PreloadImage = ({source, style}: any) => {
  const [loading, setLoading] = useState<boolean>(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <View style={style}>
      {loading && <SkeletonLoader />}
      <FastImage
        source={source}
        onLoad={handleLoad}
        style={[style, loading ? {opacity: 0} : null]}
      />
    </View>
  );
};

const MoviePoster = ({item, style}: MoviePosterInterface) => {
  const navigation: NavigationHook = useNavigation();
  const posterUrl = `${IMAGE_URL}${item.poster_path}`;

  return (
    <TouchableOpacity
      style={style}
      onPress={() => navigation.navigate(routes.MOVIE, {item})}>
      <PreloadImage source={{uri: posterUrl}} style={localStyles.poster} />
    </TouchableOpacity>
  );
};
export default MoviePoster;

export const localStyles = StyleSheet.create({
  poster: {width: 180, height: 250, borderRadius: 5},
});
