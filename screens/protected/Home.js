import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Animated} from "react-native";
import {useNavigation} from "@react-navigation/native";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import axios from "axios";
import Burger from "../../components/layouts/header/Burger";
import ModalFilter from "../../components/Modal/ModalFilter";


function Home(props) {
    const navigation = useNavigation()

    const mapRef = useRef()
    const [status, setStatus] = useState(null);
    const [mapRegion, setmapRegion] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [modal, setModal] = useState('');

    useEffect(() => {
        (async () => {
            let { status } = await  Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setStatus('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});

            setmapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });

            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 1000);

            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
        })();
    }, []);

    const getNearbyRestaurants = async () => {

        const distance = 150
        const price = 2


        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
                params: {
                    location: `${latitude},${longitude}`,
                    radius: distance,
                    type: 'restaurant',
                    keyword: 'burger',
                    key: 'AIzaSyA3I7cXhLM51hRryr_l_70JMJqKuviH4do',
                    opennow: false,
                    price_level: price,

                }
            })


            const allRestaurants = response.data.results;
            const filteredRestaurants = allRestaurants.filter(restaurant =>
                restaurant.rating >= 4 );

            // const filtedeRestaurantsByPrice = filteredRestaurants.filter(restaurant =>
            // console.log(restaurant.price_level)
            // );

            // console.log(filtedeRestaurantsByPrice)


            for (let i = 0; i < filteredRestaurants.length; i++) {
                // console.log('filter restaurant numéro ' + i + ' ' + response.data.results[i].name + ', note : ' + response.data.results[i].rating + ', prix : ' + response.data.results[i].price_level + ', ouvert : ' + response.data.results[i].opening_hours.open_now + ', distance : ' + response.data.results[i].vicinity + ', coordonnées : ' + response.data.results[i].geometry.location.lat + ', ' + response.data.results[i].geometry.location.lng)
                console.log(response.data.results[i])
            }

            navigation.navigate('Result', {
                restaurants: filteredRestaurants
            })

            return response.data.results
        } catch (e) {
            console.log(e)
        }
    }

    const handleModal = (modalType) => {

        if(modal === ''){
            setModal(modalType)
            Animated.timing(leftAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else if (modal === modalType) {
            Animated.timing(leftAnim, {
                toValue: 1000,
                duration: 300,
                useNativeDriver: true,
            }).start();
            setTimeout(() => {
            setModal('')

            }, 300)

        } else {
            setModal(modalType)
            Animated.timing(leftAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }

    // Animation modal

    const leftAnim = useRef(new Animated.Value(1000)).current






    return (
        mapRegion === null ? <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>Loading...</Text></View> :
            (
                <View style={{flex:1}}>
                    <Burger/>
                    <Animated.View style={[ styles.modal, { transform: [{translateX: leftAnim}] }]}>
                        <ModalFilter  modal={modal}  />
                    </Animated.View>

                    <View style={styles.containerMain} >
                        <View style={styles.containerMainTop}>
                            <TouchableOpacity style={[styles.btnMoreFilter, styles.btn]} >
                                <Text style={{fontSize:14}}>Plus de filtres</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.containerMiddle} >
                            <TouchableOpacity
                                style={[styles.btnFilter, styles.btn]}
                                onPress={ () => handleModal('budget') }
                            >
                                <Text style={{fontSize:16}}>Mon budget</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={[styles.btnFilter, styles.btn]}
                                onPress={ () => handleModal('distance') }
                            >
                                <Text style={{fontSize:16}}>Distance</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerBigCta} >
                            { <TouchableOpacity
                                style={[styles.btn, styles.bigCta]}
                                onPress={() => getNearbyRestaurants()}
                            >
                                <Text style={{fontSize: 26, fontFamily: 'PoppinsBold'}} >Trouve moi un restau</Text>
                            </TouchableOpacity> }
                        </View>

                    </View>
                    <MapView
                        style={StyleSheet.absoluteFill}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={mapRegion}
                        showsUserLocation
                        showsMyLocationButton
                        followsUserLocation
                        maxZoomLevel={17}
                        minZoomLevel={15}
                        ref={mapRef}
                    />
                </View>
            )
    );
}

export default Home;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerMain: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#51796F',
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1000,
        height: '35%',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },
    containerMainTop: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    btn:{
        backgroundColor: 'white',
        borderRadius: 10,
    },
    btnMoreFilter: {
        padding: 10,
    },
    containerMiddle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 25,
    },
    btnFilter: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '45%',
        alignItems: 'center',
    },
    containerBigCta: {
        marginTop: 50,
        width: '100%',
    },
    bigCta: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
    },
    modal: {
        position: 'absolute',
        top: '30%',
        left: 0,
        width: '100%',
        backgroundColor: '#51796F',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        paddingHorizontal: 20,
        paddingVertical: 50,
    },

})
