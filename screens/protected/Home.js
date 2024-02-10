import React from 'react';
import {ScrollView, Text, View, StyleSheet, Button, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home(props) {

    const navigation = useNavigation()
    const resetAsyncStorage = async () => {
        await AsyncStorage.removeItem('alreadyLaunched');
        const value = await AsyncStorage.getItem('alreadyLaunched'); // Cela devrait maintenant être null
        console.log('Async storage reset', value);
    }


    return (
        <ScrollView>
            <View style={styles.container} >
                <Text style={styles.text} >Home</Text>
            </View>

        </ScrollView>
    );
}

export default Home;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f8f8ff',
        height: 100,
        width: "100%",
        top: 250,
    },
    text: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 30,
        marginHorizontal: 20,
        textAlign: 'center',
    }
})
