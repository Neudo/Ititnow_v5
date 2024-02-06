import React from 'react';
import {ScrollView, Text, View, StyleSheet} from "react-native";

function Home(props) {
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
