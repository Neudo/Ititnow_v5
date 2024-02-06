import React, {useState} from 'react';
import Checkbox from 'expo-checkbox';
import {View, Text} from "react-native";
import {StyleSheet} from "react-native";


function RememberMe(props) {
    const [isChecked, setChecked] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.containerCheckbox}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#6FB2AE' : undefined}
                />
                <Text style={styles.paragraph}>Se souvenir de moi</Text>
            </View>
            <View>
                <Text style={{ color:'#6FB2AE' }} >Mot de passe oublie ?</Text>
            </View>
        </View>
    );
}

export default RememberMe;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerCheckbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        margin: 8,
        borderColor: '#6FB2AE',
    },
})