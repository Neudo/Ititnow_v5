import React, {useState} from 'react';
import {View} from "react-native";
import Input from "../../components/Input";
import RememberMe from "../../components/RememberMe";
import Cta from "../../components/Cta";
import SocialLogin from "../../components/SocialLogin";
import {useNavigation} from "@react-navigation/native";
import {Auth} from "aws-amplify";


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation()

    async function signIn() {
        try {
            const user = await Auth.signIn(email, password);
            console.log('user', user)
            if(user){
                navigation.navigate("Home")
            }

        } catch (error) {
            console.log('error signing in', error);
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
            <RememberMe/>
            <Cta text={'Connexion'} onPress={signIn} />
            <SocialLogin text={ 'connecter' } />
        </View>
    );
}

export default Login;
