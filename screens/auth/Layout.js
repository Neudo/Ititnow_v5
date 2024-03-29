import React, {useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from "react-native";
import {StyleSheet} from "react-native";
import style  from "../../assets/css/style";
import Toggle from "../../components/Toggle";
import { useFonts, Poppins_400Regular, Poppins_300Light, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Login from "./Login";
import Register from "./Register";


function Layout(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_300Light,
        Poppins_700Bold,
    });
    const [isEnabled, setIsEnabled] = useState(true);

    const navigation = props.navigation;

    return (
        <SafeAreaView>
            <Pressable onPress={()=> {navigation.navigate('Home')}} ><Text>Go to home</Text></Pressable>
            <View style={{top: 120, height:"23%", position:'relative', marginBottom: 33, marginHorizontal:20}} >
                <Text style={[style.title, styles.title]} >Créer votre compte ou connecter vous</Text>
                <Text style={[style.smallText, styles.subTitle]}>Connecter vous afin de profiter au mieux des fonctionnalités de Ititnow</Text>
            </View>
            <View style={styles.container} >
                <ScrollView >
                    <Toggle isEnabled={isEnabled} setIsEnabled={setIsEnabled}  />
                    {isEnabled ? <Login/> : <Register/>}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default Layout;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: "100%",
        width: "100%",
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        paddingHorizontal: 20,
    },
    title: {
        color: 'white',
        fontFamily: 'Poppins_700Bold',
    },
    subTitle: {
        color: '#d5d5d5',
        fontFamily: 'Poppins_400Regular',
    },
})

