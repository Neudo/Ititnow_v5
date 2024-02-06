import {Pressable, StyleSheet, Text, View} from 'react-native';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import {NavigationContainer} from "@react-navigation/native";
import RootNavigation from "./navigator/RootNavigation";
Amplify.configure(awsconfig);


export default function App() {


  async function signIn(username, password) {
      console.log('avant try')
    try {
      const user = await Auth.signIn(username, password);
        console.log('user', user)

    } catch (error) {
        console.log('putain')
      console.log('error signing in', error);
    }
  }


  return (
      <NavigationContainer>
          <RootNavigation/>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
