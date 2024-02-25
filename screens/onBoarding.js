import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView, Pressable} from "react-native";
import { MaterialIcons} from '@expo/vector-icons';
import generalStyle  from "../assets/css/style";
import SmallCta from "../components/SmallCta";
import {useNavigation} from "@react-navigation/native";
import {Gesture, GestureDetector, Directions} from "react-native-gesture-handler";

import Animated, {
    FadeIn,
    FadeOut,
    SlideInRight,
    SlideOutLeft,
} from 'react-native-reanimated'



const onBoardingSteps = [
    {
        title: "Découvrez de nouveaux lieux",
        description: "Pour manger maintenant, ou pour plus tard, en fonction de vos goûts.",
        icon: 'food-bank'
    },
    {
        title: "On vous propose des restaurants",
        description: "Pour manger maintenant, ou pour plus tard, en fonction de vos goûts.",
        icon: 'add-location-alt'
    },
    {
        title: "Créez votre compte",
        description: "Pour sauvegarder vos restaurants à tester plus tard.",
        icon: 'account-circle'
    }

]
function OnBoarding() {
    const navigation = useNavigation()

    const [screenIndex, setScreenIndex] = useState(0)
    const data = onBoardingSteps[screenIndex]


    const onContinue = () => {
        if(screenIndex < onBoardingSteps.length - 1) {
            setScreenIndex(screenIndex + 1)
        } else {
            navigation.navigate('AuthLayout')
        }
    }

    const onBack = () => {
        if(screenIndex > 0) {
            setScreenIndex(screenIndex - 1)
        }
    }


    const swipes = Gesture.Simultaneous(
        Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
        Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
    )

    return (
        <SafeAreaView style={styles.page} >
            <GestureDetector gesture={swipes}>
            <View key={screenIndex} style={styles.pageContent} >
                <View style={styles.header}>
                    {onBoardingSteps.map((step, index) => {
                        return (
                            <View
                                key={index}
                                style={[
                                    styles.stepIndicator,
                                    { backgroundColor: index === screenIndex ? '#6FB2AE' : 'grey' }
                                ]} />
                        )
                    })}

                </View>

                <Animated.View entering={FadeIn} exiting={FadeOut}  >
                <MaterialIcons style={styles.image} name={data.icon} size={124} color="#6FB2AE" />
                </Animated.View>
                <View style={styles.footer} >
                    <Animated.Text entering={SlideInRight.duration(300)} exiting={SlideOutLeft} style={[generalStyle.title, styles.title]} >{data.title}</Animated.Text>
                    <Animated.Text entering={SlideInRight.delay(70)}  exiting={SlideOutLeft}   style={styles.description} >{data.description}</Animated.Text>

                    <View style={styles.buttonsRow} >
                        <Pressable onPress={()=> {navigation.navigate("AuthLayout")}} >
                            <Text style={styles.skip} >Passer</Text>
                        </Pressable>
                        <View style={styles.ctaWrapper} >
                            <SmallCta onPress={onContinue} text={screenIndex !== onBoardingSteps.length - 1 ? "Suivant" : "Terminer"} />
                        </View>
                    </View>


                </View>
            </View>
            </GestureDetector>
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
        marginTop : 120,
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
        width: '80%',
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
    },
    header: {
        flexDirection: 'row',
        gap: 10,
    },
    stepIndicator : {
        height: 3,
        flex: 1,
        borderRadius: 10,
    }
})
