import {NavigationProp} from '@react-navigation/native';

export interface NavigationType {
  navigation: NavigationProp<any, any>;
  route?: any;
}

export interface NavigationHook {
  navigate: any;
  goBack: () => void;
  reset: any;
  replace: any;
  // ...other methods and properties
}
