import React, {useState, } from 'react';
import {Text, View, StyleSheet} from "react-native";
import Input from "../../components/Input";
import Cta from "../../components/Cta";
import SocialLogin from "../../components/SocialLogin";
import {useNavigation} from "@react-navigation/native";
import {Auth} from "aws-amplify";
import Checkbox from "expo-checkbox";


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setChecked] = useState(false);


    async function signIn() {
        try {
            const user = await Auth.signIn(email, password);
            // console.log('user', user)
            if(user){
                isChecked ? await rememberDevice() : null
            }

        } catch (error) {
            console.log('error signing in', error);
        }
    }

    async function rememberDevice() {
        try {
            const result = await Auth.rememberDevice();
            // console.log(result);
        } catch (error) {
            console.log('Error remembering device', error);
        }
    }


    return (
        <View>
            <Input
                placeHolder={'Email'}
                iconLeft={21} iconRight={25}
                onChangeText={setEmail}
                value={email}
            />
            <Input
                placeHolder={'Mot de passe'}
                type={'password'}
                iconLeft={22} iconRight={[23, 24]}
                onChangeText={setPassword}
                value={password}
            />
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
            <Cta text={'Connexion'} onPress={signIn} />
            <SocialLogin text={ 'connecter' } />
        </View>
    );
}

export default Login;

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
