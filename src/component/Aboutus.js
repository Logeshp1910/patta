import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import { Share } from 'react-native';

const Aboutus = ({ navigation }) => {  
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuToggle = () => setMenuVisible(!menuVisible);
  const handleMenuClose = () => setMenuVisible(false);


  const handleShare = async () => {
    try {
      await Share.share({
        message:
          'Check out this amazing app for Patta, Chitta, and EC services. You can apply for Patta, verify Chitta, and get EC documents easily from the app. Download it now!',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Provider>
      <View style={styles.container}>

        <View style={styles.menuContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={handleMenuClose}
            anchor={
              <TouchableOpacity onPress={handleMenuToggle} style={styles.menuButton}>
                <Text style={styles.menuDots}>⋮</Text> 
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={() => navigation.navigate('Aboutus')} title="About Us" />
            <Menu.Item onPress={handleShare} title="Share" />
            <Menu.Item onPress={() => navigation.navigate('Privacy')} title="Privacy Policy" />
          </Menu>
        </View>

        <Text style={styles.title}>About Us</Text>
        <Text style={styles.description}>
          Welcome to our Online Patta, Chitta, and EC service app. This app is designed to provide users with easy access to important land record services. 
          You can apply for Patta, verify Chitta, and get the Electronic Copy (EC) of documents, all from the comfort of your home. 
          Our goal is to make land record management efficient, transparent, and accessible for all users.
        </Text>
        <Text style={styles.description}>With this app, you can:</Text>
        <Text style={styles.bulletPoint}>• Apply for Patta online</Text>
        <Text style={styles.bulletPoint}>• Verify Chitta records</Text>
        <Text style={styles.bulletPoint}>• View Patta/Chitta</Text>
        <Text style={styles.bulletPoint}>• Get the Electronic Copy (EC) of land records</Text>
        <Text style={styles.description}>
          We are committed to providing a hassle-free experience for managing land records and documentation.
        </Text>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '30%',
    color: 'darkblue',
  },
  menuContainer: {
    position: 'absolute',
    top: 10,  
    left:'100%',
    zIndex: 3,  
  },
  menuButton: {
    padding: 10,
  },
  menuDots: {
    fontSize: 24,
    color: 'black',
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
    lineHeight: 24,
  },
  bulletPoint: {
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 5,
  },
});

export default Aboutus;