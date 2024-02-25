import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Layout from "../screens/auth/Layout";
import Home from "../screens/protected/Home";
import {useNavigation} from "@react-navigation/native";
import {Auth, Hub} from "aws-amplify";
import OnBoarding from "../screens/onBoarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Menu from "../components/layouts/header/Menu";


function RootNavigation(props) {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation()
    const [initialRoute, setInitialRoute] = useState('');

    //AsyncStorage

    async function checkFirstLaunch() {
        try {
            const value = await AsyncStorage.getItem('alreadyLaunched')
            if (value === null) {
                await AsyncStorage.setItem('alreadyLaunched', 'true')
                setInitialRoute('onBoarding')
            } else {
                setInitialRoute('authLayout')
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        checkFirstLaunch()
    }, []);


    useEffect(() => {
        const listener = (data) => {
            switch (data?.payload?.event) {
                case 'signIn':
                    console.log('user signed in')
                    navigation.navigate("Home")
                    break;
            }
        }
        Hub.listen('auth', listener)
    }, []);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser()
                if(user){
                    navigation.navigate("Home")
                }
            } catch (error) {
                console.log('error', error)
            }
        }
        checkUser()
    }, []);

    return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                contentStyle:{
                    backgroundColor:'#51796F',
                }}
            }
        >

            <Stack.Screen
                name="OnBoarding" component={OnBoarding}
                options={{headerShown: false, animation: 'slide_from_left'}}
            />
            <Stack.Screen
                name="AuthLayout" component={Layout}
                options={{headerShown: false, animation: 'slide_from_right'}}
            />
            <Stack.Screen
                name="Home" component={Home}
                options={{headerShown: false, animation: 'slide_from_right'}}
            />
            <Stack.Screen
                name="Menu" component={Menu}
                options={{headerShown: false, animation: 'slide_from_bottom'}}
            />

        </Stack.Navigator>
    );
}

export default RootNavigation;
