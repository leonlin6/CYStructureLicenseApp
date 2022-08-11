
import React, {useState, useEffect} from 'react';
import { 
  LogBox, 
  StyleSheet,
  View,
  Text 
} from "react-native"

// import { AuthContext } from './components/context';
import {connect} from 'react-redux';
import { NavigationContainer, TabActions, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Login Page
import RootStackScreen from './navigators/RootStackScreen';
// navigators

// License Screen
import LicenseHome from './screens/License/LicenseHome';
import LicenseList from './screens/License/LicenseList';
import CompanyList from './screens/License/CompanyList';
import LicenseDetail from './screens/License/LicenseDetail';
import LicenseQR from './screens/License/LicenseQR';
import Scan from './screens/License/Scan';



const App = (props) => {

  const Stack = createStackNavigator();


  return (
    <NavigationContainer>  
      <Stack.Navigator>
          <Stack.Screen name='RootStackScreen' component={RootStackScreen} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name='LicenseHome' options={{title:'執照'}} component={LicenseHome} ></Stack.Screen>
          <Stack.Screen name='LicenseList' options={{title:'執照清單'}} component={LicenseList} ></Stack.Screen>
          <Stack.Screen name='CompanyList' options={{title:'公司清單'}} component={CompanyList} ></Stack.Screen>
          <Stack.Screen name='LicenseDetail' options={{title:'執照細節'}} component={LicenseDetail} ></Stack.Screen>
          <Stack.Screen name='LicenseQR' options={{title:'查驗執照'}} component={LicenseQR} ></Stack.Screen>
          {/* <Stack.Screen name='Scan' options={{title:'查驗執照'}} component={Scan} ></Stack.Screen> */}

        </Stack.Navigator>                
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken
  };
}  

 
const styles = StyleSheet.create({
  headerTitle:{
    ontSize:25, 
    fontWeight:'bold'
  }
});

export default connect(mapStateToProps)(App);

