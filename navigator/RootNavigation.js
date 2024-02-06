import React, {useEffect} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Layout from "../screens/auth/Layout";
import Home from "../screens/protected/Home";
import {useNavigation} from "@react-navigation/native";
import {Auth, Hub} from "aws-amplify";
import OnBoarding from "../screens/onBoarding";


function RootNavigation(props) {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation()

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
            screenOptions={{
                contentStyle:{
                    backgroundColor:'#51796F',
                }}
            }
        >
            <Stack.Screen
                name="AuthLayout" component={Layout}
                options={{headerShown: false, animation: 'slide_from_right'}}
            />
            <Stack.Screen
                name="Home" component={Home}
                options={{headerShown: false, animation: 'slide_from_right'}}
            />

            <Stack.Screen
                name="OnBoarding" component={OnBoarding}
                options={{headerShown: false, animation: 'slide_from_left'}}
            />


        </Stack.Navigator>
    );
}

export default RootNavigation;
