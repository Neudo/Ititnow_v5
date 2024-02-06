import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, Pressable} from "react-native";
import { MaterialIcons} from '@expo/vector-icons';
import generalStyle  from "../assets/css/style";
import SmallCta from "../components/SmallCta";


function OnBoarding() {
    return (
        <SafeAreaView style={styles.page} >
            <View style={styles.pageContent} >
                <MaterialIcons style={styles.image} name="food-bank" size={124} color="#6FB2AE" />

                <View style={styles.footer} >
                    <Text style={[generalStyle.title, styles.title]} >Découvrez de nouveaux lieux</Text>
                    <Text style={styles.description} >Pour manger maintenant, ou pour plus tard, en fonction de vos goûts.</Text>

                    <View style={styles.buttonsRow} >
                        <Pressable>
                            <Text style={styles.skip} >Passer</Text>
                        </Pressable>
                        <View style={styles.ctaWrapper} >
                            <SmallCta text={"Suivant"} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default OnBoarding;

const styles = StyleSheet.create({
    page : {
        justifyContent : 'center',
        flex : 1,
        backgroundColor : '#15141A',
    },
    pageContent : {
        padding : 20,
        flex : 1,
    },
    image : {
        alignSelf : 'center',
        marginBottom : 20,
    },
    title :{
        color: '#FDFDFD',
        marginBottom: 20,
        fontSize: 40,
        letterSpacing: 1.3,
        lineHeight: 46,

    },
    description : {
        color: 'gray',
        fontSize: 18,
    },
    footer : {
        marginTop : 'auto',
    },
    ctaWrapper : {
        width: '50%',
    },
    skip : {
        color: 'gray',
        textAlign: 'left',
        marginTop: 20,
        marginLeft: 20,
        padding: 15,
    },
    buttonsRow : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    }
})
