import {ReactNode} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

interface WrapperInterface {
  children: ReactNode;
}

const Wrapper = ({children}: WrapperInterface): JSX.Element => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={[localStyles.wrapper]}>
    {children}
  </ScrollView>
);

export default Wrapper;

export const localStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
  },
});
