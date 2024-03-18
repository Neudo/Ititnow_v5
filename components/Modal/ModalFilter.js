import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import Filter from "./Filter";



function BudgetFilter(props) {
    return (
        <View style={styles.filterContainer}>
            <Filter value={"Abordable"} />
            <Filter value={"Modéré"}/>
            <Filter value={"Cher"}/>
        </View>
    );
}

function DistanceFilter(props) {

    return (
        <View style={styles.filterContainer}>
            <Filter value={"Proche"} />
            <Filter value={"Moyen"}/>
            <Filter value={"Loin"}/>
        </View>
    );
}




function ModalFilter({modal}) {


    return (
        <View style={styles.container} >
            <Text style={{color:'white', fontSize:24}} >
                {modal === 'budget' ? "Mon budget" : "Distance"}
            </Text>

            {modal === 'budget' && <BudgetFilter/>}
            {modal === 'distance' && <DistanceFilter/>}
            {/*<BudgetFilter />*/}
        </View>
    );
}

export default ModalFilter;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '30%',
        left: 0,
        width: '100%',
        backgroundColor: '#51796F',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        paddingHorizontal: 20,
        paddingVertical: 50,
    },

    //Filter


    filterContainer: {
        marginTop: 30,
        flexDirection: 'row',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
    }
})
