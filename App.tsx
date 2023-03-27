import AppNavigator from 'src/navigators/AppNavigator';
import {Provider} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';
import store from 'src/store/store';

const App = () => (
  <Provider store={store}>
    <ToastProvider>
      <AppNavigator />
    </ToastProvider>
  </Provider>
);

export default App;
