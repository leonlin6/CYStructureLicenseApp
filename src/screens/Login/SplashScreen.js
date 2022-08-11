import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const SplashScreen = () => {
    return(
        <SafeAreaView style={styles.container}>
          <Image style={styles.logo} source={require('../../assets/images/CYLogo.png')}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    width:300,
    height:300
  }

});
export default SplashScreen;