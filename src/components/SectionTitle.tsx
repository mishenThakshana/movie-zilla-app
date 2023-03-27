import {Text, StyleSheet} from 'react-native';
import fonts from 'src/constants/fonts';

interface SectionTitleInterface {
  title: string;
}

const SectionTitle = ({title}: SectionTitleInterface): JSX.Element => (
  <Text style={localStyles.sectionTitle}>{title}</Text>
);

export default SectionTitle;

export const localStyles = StyleSheet.create({
  sectionTitle: {
    color: '#fff',
    fontFamily: fonts.REGULAR,
    fontSize: 18,
    paddingVertical: 20,
  },
});
