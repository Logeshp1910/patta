import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import { Share } from 'react-native';
import { WebView } from 'react-native-webview';

const Privacy = ({ navigation }) => {  
  const [selectedView, setSelectedView] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuToggle = () => setMenuVisible(!menuVisible);
  const handleMenuClose = () => setMenuVisible(false);

  const handleButtonClick = (view) => {
    setSelectedView(view);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          'Check out this amazing app for Patta&Ec. You can apply for Patta, verify Chitta, and get EC documents easily from the app. Download it now!',
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
            <Menu.Item onPress={handleShare} title="Shares" />        
            <Menu.Item onPress={() => navigation.navigate('Privacy')} title="Privacy Policy" />
          </Menu>
        </View>
{/* 
        <Text style={styles.title}>Privacy</Text> */}
                  <>
            <WebView
              source={{ uri: 'https://tamiltechnowtamil.blogspot.com/2024/12/privacy-policy.html' }}
              style={styles.fullScreenWebview}
            />
          </>
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
});

export default Privacy;