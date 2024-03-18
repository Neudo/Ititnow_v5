import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";

function Filter({value}) {
    const [filterActive, setFilterActive] = useState(false)

    return (
        <TouchableOpacity
            style={[
                styles.budgetFilter,
                filterActive && styles.active
            ]}
            onPress={() => setFilterActive(true)}
        >
            <Text
                style={[
                    styles.budgetFilterText,
                    filterActive && styles.activeText
                ]}>{value}</Text>
        </TouchableOpacity>
    );
}

export default Filter;

const styles = StyleSheet.create({
    //Filter
    budgetFilter: {
        padding: 10,
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
