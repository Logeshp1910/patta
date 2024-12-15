import React, { useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler,Image } from 'react-native';

const Loading = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.reset({
                index: 0, 
                routes: [{ name: "Main" }], 
            });
        }, 1000);

        const backAction = () => {

            BackHandler.exitApp(); 
            return true; 
        };

        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => {
            clearTimeout(timer);
            BackHandler.removeEventListener("hardwareBackPress", backAction); 
        };
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
             <Image
              source={require('../../src/Assets/Untitled.png')}
              style={styles.image}
            />
            </View>
            <Text style={styles.text}>TamilNadu :Online Patta/ Chitta & EC </Text>
            <View>
            <Text style={styles.text1}>App Version 1</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        color: 'blue',
        fontWeight:'bold'
    },
    text1: {
        fontSize: 15,
        color: 'black',
        marginTop:80
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
      },
      image: {
        width: 150,
        height: 150,
        borderRadius: 50,
        resizeMode: 'cover',
        marginRight: 10,
      },
});

export default Loading;