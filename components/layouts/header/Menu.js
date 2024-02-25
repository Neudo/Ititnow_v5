import React from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import { Auth } from 'aws-amplify';
import {useNavigation} from "@react-navigation/native";



function Menu() {
    const navigation = useNavigation()


    async function signOut() {
        try {
            await Auth.signOut({ global: true });
            navigation.navigate('AuthLayout')
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=> {navigation.goBack()}} style={styles.containerClose} >
                <View style={styles.close} />
                <View style={[styles.close, {transform: [{rotate: '-45deg'}]}]} />
            </TouchableOpacity>
            <Pressable style={{top: 400, left: 150}} onPress={signOut} ><
                Text>Se déconnecter</Text>
            </Pressable>

        </View>
    );
}

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6FB2AE',
    },
    containerClose: {
        backgroundColor: 'white',
        height: 44,
        width: 44,
        borderRadius: '50%',
        top: 65,
        left: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.40,
        shadowRadius: 3.84,

        elevation: 7,
    },
    close: {
        position:'absolute',
        backgroundColor: 'black',
        height: 4,
        width: 25,
        borderRadius: 2,
        transform: [{rotate: '45deg'}],
    }
})
