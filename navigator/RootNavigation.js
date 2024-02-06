import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Layout from "../screens/auth/Layout";
import Home from "../screens/protected/Home";


function RootNavigation(props) {
    const Stack = createNativeStackNavigator();

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


        </Stack.Navigator>
    );
}

export default RootNavigation;
