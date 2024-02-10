import {ActivityIndicator, StyleSheet} from 'react-native';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import {NavigationContainer} from "@react-navigation/native";
import RootNavigation from "./navigator/RootNavigation";
import {Poppins_300Light, Poppins_400Regular, Poppins_700Bold, useFonts} from "@expo-google-fonts/poppins";
import {SplashScreen} from "expo-router";
import {useEffect, useState} from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
Amplify.configure(awsconfig);
import {Provider} from "react-redux";
import store from "./redux/store";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    // const [appIsReady, setAppIsReady] = useState(false);

    const [fontsLoaded, fontError] = useFonts({
        PoppinsRegular: Poppins_400Regular,
        PoppinsLight:   Poppins_300Light,
        PoppinsBold:    Poppins_700Bold,
    })

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync()
        }
    }, [ fontsLoaded, fontError ]);

    if (!fontsLoaded && !fontError) {
        return null
    }



    return (
        <Provider store={store} >
            <GestureHandlerRootView style={ {flex:1} } >
                <NavigationContainer>
                    <RootNavigation/>
                </NavigationContainer>
            </GestureHandlerRootView>
        </Provider>
    );
}

