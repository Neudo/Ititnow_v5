import {Pressable, StyleSheet, Text, View} from 'react-native';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import RootNavigation from "./navigator/RootNavigation";
Amplify.configure(awsconfig);
import { Hub } from 'aws-amplify'





export default function App() {

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
