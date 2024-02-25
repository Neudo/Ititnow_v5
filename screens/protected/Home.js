import React, {useRef} from 'react';
import {ScrollView, Text, View, StyleSheet, Button, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import axios from "axios";
import Burger from "../../components/layouts/header/Burger";

const initialRegion = {
    latitude: 48.866667,
    longitude: 2.333333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}


function Home(props) {
    const mapRef = useRef()


    const navigation = useNavigation()

    const getNearbyRestaurants = async (latitude, longidtude) => {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
                params: {
                    location: `${latitude},${longidtude}`,
                    radius: 900,
                    type: 'restaurant',
                    keyword: 'pizza',
                    key: 'AIzaSyA3I7cXhLM51hRryr_l_70JMJqKuviH4do',
                    opennow: false,
                }
            })

            const allRestaurants = response.data.results;
            const filteredRestaurants = allRestaurants.filter(restaurant =>
                restaurant.rating >= 4 );

            console.log(response.data.results[2])


            for (let i = 0; i < filteredRestaurants.length; i++) {
                // console.log('filter restaurant numéro ' + i + ' ' + response.data.results[i].name)
            }
            return response.data.results
        } catch (e) {
            console.log(e)
        }
    }


    return (

            <View style={{flex:1}}>
                <Burger/>
                { <Pressable
                    style={styles.cta}
                    onPress={() => getNearbyRestaurants(48.866667, 2.333333)}
                >
                    <Text>Get nearby restaurants</Text>
                </Pressable> }
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
    cta: {
        backgroundColor: '#6FB2AE',
        padding: 20,
        borderRadius: 10,
        margin: 20,
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        zIndex: 1000,
    }
})
