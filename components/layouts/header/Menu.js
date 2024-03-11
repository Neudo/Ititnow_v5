import React from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import { Auth } from 'aws-amplify';
import {useNavigation} from "@react-navigation/native";
import RemoveAds from "./RemoveAds";
import {useDispatch} from "react-redux";
import {userLoggedIn} from "../../../redux/slices/checkUser";



function Menu() {
    const navigation = useNavigation()
    const dispatch = useDispatch()


    async function signOut() {
        try {
            await Auth.signOut({ global: true });
            dispatch(userLoggedIn(false))
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={()=> {navigation.goBack()}} style={styles.containerClose} >
                    <View style={styles.close} />
                    <View style={[styles.close, {transform: [{rotate: '-45deg'}]}]} />
                </TouchableOpacity>
                <Text style={{textAlign:'center', color:'white', fontSize:25, fontFamily:'PoppinsBold' }} >Paramètres</Text>
            </View>

            <View style={[styles.containerItems, {marginTop: 80, paddingBottom: 25}]}>
                <RemoveAds/>
            </View>

            <View style={[styles.containerItems, {marginTop: 20}]}>
                <View style={styles.wrapperItem}>
                    <Pressable>
                        <Text style={styles.item}>Mon compte</Text>
                    </Pressable>
                </View>
                <View style={styles.wrapperItem}>
                    <Pressable>
                        <Text style={styles.item}>Notifications</Text>
                    </Pressable>
                </View>
                <View style={styles.wrapperItem}>
                    <Pressable>
                        <Text style={styles.item}>Noter l'appli</Text>
                    </Pressable>
                </View>
                <View style={styles.wrapperItem}>
                    <Pressable>
                        <Text style={styles.item}>Aide</Text>
                    </Pressable>
                </View>
                <View style={styles.wrapperItem}>
                    <Pressable>
                        <Text style={styles.item}>Conditions d'utilisation</Text>
                    </Pressable>
                </View>
                <View style={styles.wrapperItem}>

                    <Pressable  onPress={signOut} ><
                        Text style={styles.item}>Se déconnecter</Text>
                    </Pressable>
                </View>
            </View>
            <Pressable style={styles.deleteAccount} >
                <Text style={{color: 'red'}}>Supprimer le compte</Text>
            </Pressable>
        </View>
    );
}

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#51796F',
        paddingTop: 30,
    },
    containerItems: {
        marginHorizontal: 23,
    },
    containerClose: {
        backgroundColor: 'white',
        height: 44,
        width: 44,
        borderRadius: '50%',
        top: 40,
        left: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.40,
        shadowRadius: 3.84,

        elevation: 7,
    },
    close: {
        position:'absolute',
        backgroundColor: 'black',
        height: 3,
        width: 25,
        borderRadius: 2,
        transform: [{rotate: '45deg'}],
    },
    wrapperItem: {
        borderBottomColor: 'rgba(85,124,110,0.6)',
        borderBottomWidth:1,
        marginBottom:15
    },
    item: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'PoppinsRegular',
        marginBottom: 10,
    },
    deleteAccount: {
        // backgroundColor: 'rgba(255,255,255,0.2)',
        backgroundColor: 'white',
        padding: 20,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0
    }

})
