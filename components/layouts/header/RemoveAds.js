import React from 'react';
import {Text, TouchableOpacity} from "react-native";

function RemoveAds(props) {
    return (
        <TouchableOpacity onClick={() => {
            console.log('TO DO : remvoe ads')}}
            style={{backgroundColor: 'white', padding: 16, borderRadius: 5, width: '70%', alignItems: 'center', justifyContent: 'center'
        }}
        >
        <Text style={{fontFamily: 'PoppinsBold', fontSize: 20}}>Enlever les pubs</Text>
        </TouchableOpacity>
    );
}

export default RemoveAds;
