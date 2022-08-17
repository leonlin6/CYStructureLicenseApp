
import React, {useState, useEffect} from 'react';
import { 
  LogBox, 
  StyleSheet,
  Image,
  Text,
  View
} from "react-native"

// import { AuthContext } from './components/context';ｓ
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
import Result from './screens/License/Result';
import Logout from './screens/Login/LogoutScreen';



const App = (props) => {

  const Stack = createStackNavigator();

  const LogoTitle = () => {
    return (
      <View style={{flexDirection:"row", alignItems:'center'}}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require('./assets/images/CYLogo.png')}
        />
        <Text style={{fontSize:25, marginLeft:5,}}>執照</Text>
      </View>

    );
  }

  return (
    <NavigationContainer>  
      <Stack.Navigator>
          {
            props.loginToken !== null ? (
              <Stack.Screen 
                name='LicenseHome' 
                options={{ 
                  headerTitle: (props) => <LogoTitle {...props} /> , 
                  title:'執照清單', 
                  headerTitleAlign: 'center', 
                  headerLeft: () => {return null},
                  headerStyle: {
                    elevation:0
                  }
                }} 
                component={LicenseHome} 
              ></Stack.Screen>
            ) 
            : 
            (          
              <Stack.Screen name='RootStackScreen' component={RootStackScreen} options={{headerShown: false}}></Stack.Screen>
            )
          } 

          <Stack.Screen name='LicenseList' options={{title:'執照清單'}} component={LicenseList} ></Stack.Screen>
          <Stack.Screen name='CompanyList' options={{title:'公司清單'}} component={CompanyList} ></Stack.Screen>
          <Stack.Screen name='LicenseDetail' options={{title:'執照細節'}} component={LicenseDetail} ></Stack.Screen>
          <Stack.Screen name='LicenseQR' options={{title:'查驗執照'}} component={LicenseQR} ></Stack.Screen>
          <Stack.Screen name='Scan' options={{title:'查驗執照', headerShown: false}} component={Scan} ></Stack.Screen>
          <Stack.Screen name='Result' options={{title:'查驗執照', headerShown: false}} component={Result} ></Stack.Screen>
          <Stack.Screen name='Logout' options={{title:'查驗執照', headerShown: false}} component={Logout} ></Stack.Screen>

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

