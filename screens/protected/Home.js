import React from 'react';
import {ScrollView, Text, View, StyleSheet, Button} from "react-native";
import {useNavigation} from "@react-navigation/native";

function Home(props) {

    const navigation = useNavigation()


    return (
        <ScrollView>
            <View style={styles.container} >
                <Text style={styles.text} >Home</Text>
                <Button title={"Go to OnBoarding"} onPress={() => navigation.navigate('OnBoarding')} />
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
