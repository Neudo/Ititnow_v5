import React, {useState} from 'react';
import {Modal, Text, View} from "react-native";
import Input from "../../components/Input";
import Cta from "../../components/Cta";
import SocialLogin from "../../components/SocialLogin";

import {StyleSheet} from "react-native";
import {Auth} from "aws-amplify";

function Register(props) {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [registerdEmail, setRegisterdEmail] = useState('');
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

    async function signUp() {
        console.log(email, password)
        setRegisterdEmail(email)
        try {
            const { user } = await Auth.signUp({
                username: email,
                password,
                autoSignIn: {
                    // optional - enables auto sign in after user is confirmed
                    enabled: true
                }
            });
            setModalVisible(true)
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    async function confirmSignUp() {
        try {
            await Auth.confirmSignUp(registerdEmail, confirmationCode);
            setShowConfirmationMessage(true)

        } catch (error) {
            console.log('error confirming sign up', error);
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
                value={password}
                onChangeText={setPassword}
            />
            <Cta text={'Inscription'} onPress={signUp} />
            <SocialLogin text={ "s'inscrire" } />

            {/*Poppin confirm code*/}
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.titleModal} >{showConfirmationMessage ? 'Félicitation, votre compte à bien été validé.' : 'Vérifier votre compte'}</Text>

                            {showConfirmationMessage ? <Cta text={'Fermer'} onPress={ ()=> {setModalVisible(false)} } />  : <>
                                <Text style={styles.bodyModal} >Saisissez le code à 6 chiffres reçu à l'adresse: </Text>
                                <Text style={styles.emailModal} >{email}</Text>
                                <Input
                                    placeHolder={'Code de confirmation'}
                                    iconLeft={null} iconRight={25}
                                    onChangeText={setConfirmationCode}
                                    value={confirmationCode}
                                />
                                <Cta text={'Confirmer'} onPress={confirmSignUp} />
                            </> }


                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}

export default Register;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 30,
        padding: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    titleModal: {
        fontSize: 18,
        marginBottom: 18,
    },
    bodyModal: {
        fontSize: 14,
        marginBottom: 8,
        color: '#9A999E',
    },
    emailModal: {
        fontSize: 14,
        marginBottom: 18,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        textAlign: 'center',
    }
})
