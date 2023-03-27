import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from 'src/constants/colors';

const SkeletonLoader = (): JSX.Element => {
  return (
    <SkeletonPlaceholder borderRadius={4} backgroundColor={colors.GRAY}>
      <SkeletonPlaceholder.Item width={180} height={250} />
    </SkeletonPlaceholder>
  );
};

export default SkeletonLoader;
