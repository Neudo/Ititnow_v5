import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import Filter from "./Filter";



function BudgetFilter(props) {
    const [focusedFilter, setFocusedFilter] = useState(null);

    const filters = [
        { id: 'A', value: 'Abordable' },
        { id: 'B', value: 'Modéré' },
        { id: 'C', value: 'Cher' },
    ];

    const handleFocus = (id) => {
        setFocusedFilter(id)
    }

    return (
        <View style={styles.filterContainer}>
            {filters.map(filter => (
                <Filter
                    key={filter.id}
                    setIsFocused={() => handleFocus(filter.id)}
                    isFocused={focusedFilter === filter.id}
                    value={filter.value}
                />
            ))}
        </View>
    );
}

function DistanceFilter(props) {
    const [focusedFilter, setFocusedFilter] = useState(null);

    const filters = [
        { id: 'A', value: 'Proche' },
        { id: 'B', value: 'Moyen' },
        { id: 'C', value: 'Loin' },
    ];

    const handleFocus = (id) => {
        setFocusedFilter(id);
    }

    return (
        <View style={styles.filterContainer}>
            {filters.map(filter => (
                <Filter
                    key={filter.id}
                    setIsFocused={() => handleFocus(filter.id)}
                    isFocused={focusedFilter === filter.id}
                    value={filter.value}
                />
            ))}
        </View>
    );
}




function ModalFilter({modal}) {


    return (
        <>
            <Text style={{color:'white', fontSize:24}} >
                {modal === 'budget' ? "Mon budget" : "Distance"}
            </Text>
            {modal === 'budget' && <BudgetFilter/>}
            {modal === 'distance' && <DistanceFilter/>}
        </>
    );
}

export default ModalFilter;

const styles = StyleSheet.create({

    //Filter

    filterContainer: {
        marginTop: 30,
        flexDirection: 'row',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
    }
})
