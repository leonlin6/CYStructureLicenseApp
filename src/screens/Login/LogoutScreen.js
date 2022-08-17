import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {setLoginToken} from '../../actions/index'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';


const LogoutScreen = (props) => {
    // 登出時移除Token
    
    useEffect(() => {
      console.log('--loginToken---', props.loginToken);
      props.setLoginToken(null);
      props.navigation.reset({
        index:0,
        routes: [
          {
            name:'RootStackScreen',
  
          },
        ]
      });
      return () => {
        AsyncStorage.removeItem('@userToken');
      }
    },[]);



    return ( 
      <View style={styles.loadingWrap}>
        <ActivityIndicator size='large'></ActivityIndicator>
        <Text>23423</Text>
      </View>
      );
}

const styles = StyleSheet.create({
  loadingWrap:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken
  };
}

export default connect(mapStateToProps, {setLoginToken})(LogoutScreen);