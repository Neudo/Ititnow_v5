import React, {useRef} from 'react';
import {ScrollView, Text, View, StyleSheet, Button, Pressable, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import axios from "axios";
import Burger from "../../components/layouts/header/Burger";

const initialRegion = {
    latitude: 48.8772204,
    longitude: 2.3501225,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}


function Home(props) {
    const mapRef = useRef()


    const navigation = useNavigation()

    const getNearbyRestaurants = async (latitude, longitude) => {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
                params: {
                    location: `${latitude},${longitude}`,
                    rankby: 'distance',
                    type: 'restaurant',
                    keyword: 'coréen',
                    key: 'AIzaSyA3I7cXhLM51hRryr_l_70JMJqKuviH4do',
                    opennow: false,
                }
            })


            const allRestaurants = response.data.results;
            console.log(allRestaurants)
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


    return (

        <View style={{flex:1}}>
            <Burger/>
            <View style={styles.containerMain} >
                <View style={styles.containerMainTop}>
                    <TouchableOpacity style={[styles.btnMoreFilter, styles.btn]} >
                        <Text style={{fontSize:'14'}}>Plus de filtres</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerMiddle} >
                    <TouchableOpacity style={[styles.btnFilter, styles.btn]} >
                        <Text style={{fontSize:'16'}}>Mon budget</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btnFilter, styles.btn]} >
                        <Text style={{fontSize:'16'}}>Distance max</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerBigCta} >
                    { <TouchableOpacity
                        style={[styles.btn, styles.bigCta]}
                        onPress={() => getNearbyRestaurants(48.866667, 2.333333)}
                    >
                        <Text style={{fontSize: 26, fontFamily: 'PoppinsBold'}} >Trouve moi un restau</Text>
                    </TouchableOpacity> }
                </View>

            </View>
            <MapView
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                initialRegion={initialRegion}
                showsUserLocation
                showsMyLocationButton
                maxZoomLevel={20}
                minZoomLevel={18}
                ref={mapRef}
            />
        </View>
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
})
