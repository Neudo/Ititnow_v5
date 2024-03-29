import React, {useState} from 'react';
import {TextInput, View, Text, Image, Pressable} from "react-native";
import {StyleSheet} from "react-native";

// Pictos
import Mail from '../assets/images/icons/mail.png';
import Locker from '../assets/images/icons/locker.png';
import Eye_open from '../assets/images/icons/eye_open.png';
import Eye_closed from '../assets/images/icons/eye_closed.png';
import Close from '../assets/images/icons/close.png';


function Input({placeHolder, type, iconLeft, iconRight, onChangeText, value  }) {
    const [opacity, setOpacity] = useState(0);
    const [paddingTop, setPaddingTop] = useState(0);
    const [secureTextEntry, setSecureTextEntry] = useState(true);


    const listenInput = (value) => {
        onChangeText(value)
        if (value.length > 0) {
            setOpacity(1);
            setPaddingTop(16);
        } else {
            setOpacity(0);
            setPaddingTop(0);
        }
    }

    const handleIconFeature = () => {
        if (!iconRight[0]) {
            onChangeText('')
        }  else {
            setSecureTextEntry(!secureTextEntry)
        }

    }

    return (
        <View style={styles.inputContainer}>

            <Text style={[styles.inputLabel, {opacity: opacity } ]}>{placeHolder}</Text>
            <View style={ {width: 30, display:'flex', alignItems:'center', borderRightColor: '#d5d5d5', borderRightWidth: 1, paddingRight:20 } } >
                <Image source={iconLeft} />
            </View>
            <TextInput
                style={[styles.input, {paddingTop: paddingTop}]}
                onChangeText={listenInput}
                value={value}
                placeholder={placeHolder}
                secureTextEntry={type && secureTextEntry ? true : false}
            />
            <Pressable onPress={handleIconFeature} >
                <View style={ {width: 30, display:'flex', alignItems:'center', paddingRight:20, opacity:opacity } } >
                    <Image source={iconRight[0] ? iconRight[0] : iconRight } />
                </View>
            </Pressable>
        </View>
    );

}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#d5d5d5",
        borderRadius: 15,
        height: 58,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    inputLabel: {
        fontSize: 10,
        color: '#9A999E',
        marginBottom: 5,
        position: 'absolute',
        top: 9,
        left: '21%',
    },
    input: {
        fontSize: 18,
        fontFamily: 'Poppins_400Regular',
        width: '76%',
        marginLeft: 'auto'
    }
})