import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";

function Filter({value,setIsFocused, isFocused=true}) {
    const handleFilter = () => {
        setIsFocused()
    }

    return (
        <TouchableOpacity
            style={[
                styles.budgetFilter,
                isFocused && styles.active
            ]}
            onPress={handleFilter}
        >
            <Text
                style={[
                    styles.budgetFilterText,
                    isFocused && styles.activeText
                ]}>{value}</Text>
        </TouchableOpacity>
    );
}

export default Filter;

const styles = StyleSheet.create({
    //Filter
    budgetFilter: {
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        width: '30%',
        borderWidth:4,
        borderColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
    },
    active: {
        borderWidth:4,
        borderColor: 'black',
    },
    activeText: {
        fontWeight: 'bold',
    },
    budgetFilterText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
    filterContainer: {
        marginTop: 30,
        flexDirection: 'row',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
    }
})
