import React from 'react';
import {Text, View} from "react-native";
import {StyleSheet} from "react-native";
import style  from "../../assets/css/style";
import {Auth} from "aws-amplify";

function SignUp(props) {


    async function signUp() {
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                autoSignIn: {
                    // optional - enables auto sign in after user is confirmed
                    enabled: true
                }
            });
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    return (
        <View>
            <Text style={style.title} >Créer votre compte ou connecter vous</Text>
            <Text>Connecter vous afin de profiter au mieux des fonctionnalités de Ititnow</Text>
        </View>

    );
}

export default SignUp;

const styles = StyleSheet.create({

})

