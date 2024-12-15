import React, { useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground, Image, BackHandler, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Menu, Provider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Share } from 'react-native';
import analytics from '@react-native-firebase/analytics';

const Main = ({ navigation }) => {
  const [selectedView, setSelectedView] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [exitAttempt, setExitAttempt] = useState(false);

  const handleButtonClick = (view) => {
    setSelectedView(view);
    setMenuVisible(false);

    analytics().logEvent('button_click', { button_name: view });
  };

  const handleMenuToggle = () => setMenuVisible(!menuVisible);
  const handleMenuClose = () => setMenuVisible(false);

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



  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (selectedView !== null) {
          setSelectedView(null);
          return true; 
        }

        if (exitAttempt) {
          BackHandler.exitApp();
        } else {
          setExitAttempt(true);
          Alert.alert(
            'Exit App',
            'Do you want to exit the app?',
            [
              {
                text: 'Stay',
                onPress: () => setExitAttempt(false),
                style: 'cancel',
              },
              {
                text: 'Exit',
                onPress: () => BackHandler.exitApp(),
              },
            ]
          );
          setTimeout(() => setExitAttempt(false), 2000);

          return true; 
        }
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }, [selectedView, exitAttempt])
  );
  return (
    <Provider>
      <View style={styles.container}>
        {selectedView === null && (
          <ImageBackground
            source={require('../../src/Assets/Bgcolor.jpg')}
            style={styles.imageBackground}
          >
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
            <View style={styles.header}>
              <Image
                source={require('../../src/Assets/Untitled.png')}
                style={styles.image}
              />
              <Text style={styles.headerText}>
                E-Services of{'\n'}Land Records
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleButtonClick('GeneralServices')}
            >
              <Text style={styles.buttonText}>Patta / Chitta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleButtonClick('GeneralServices')}
            >
              <Text style={styles.buttonText}>FMB-Sketch</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleButtonClick('GeneralServices')}
            >
              <Text style={styles.buttonText}>TSLR Extract</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleButtonClick('GeneralServices')}
            >
              <Text style={styles.buttonText}>A-Register Extract</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleButtonClick('GeneralServices')}
            >
              <Text style={styles.buttonText}>Verify Chitta Extract</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleButtonClick('ApplyPatta')}
            >
              <Text style={styles.buttonText}>Apply Patta online transfer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonEcContainer}
              onPress={() => handleButtonClick('online ec')}
            >
              <Text style={styles.buttonEc}>Online EC</Text>
            </TouchableOpacity>
          </ImageBackground>
        )}

        {selectedView === 'GeneralServices' && (
          <>
            <WebView
              source={{ uri: 'https://eservices.tn.gov.in/eservicesnew/home.html' }}
              style={styles.fullScreenWebview}
            />
          </>
        )}

        {selectedView === 'ApplyPatta' && (
          <>
            <WebView
              source={{ uri: 'https://tamilnilam.tn.gov.in/citizen/' }}
              style={styles.fullScreenWebview}
            />
          </>
        )}

        {selectedView === 'online ec' && (
          <>
            <WebView
              source={{ uri: 'https://tnreginet.gov.in/portal/' }}
              style={styles.fullScreenWebview}
            />
          </>
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
    marginRight: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 40,
    alignItems: 'center',
    width: '70%',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonEcContainer: {
    backgroundColor: '#c91212',
    padding: 15,
    margin: 10,
    borderRadius: 40,
    alignItems: 'center',
    width: '70%',
  },
  buttonEc: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fullScreenWebview: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuContainer: {
    position: 'absolute',
    top: 5,
    right: 10,
    zIndex: 3,
  },
  menuButton: {
    padding: 10,
  },
  menuDots: {
    fontSize: 24,
    color: 'white',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  contentText: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,

  },
});

export default Main;