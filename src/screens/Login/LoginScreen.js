import React, {useEffect, useState, useRef} from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Keyboard,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { ENDPOINT_BASE_URL } from '../../APIs/APIs';
import {setLoginToken} from '../../actions/index'


// redux
import {connect} from 'react-redux';

const LOGO_CIRCLE_HEIGHT = 200;
const LOGO_SMALL_CIRCLE_HEIGHT = 100;

const LOGO_WIDTH = 200;
const LOGO_SMALL_WIDTH = 100;

const LoginScreen = (props) => {
  const [userName , setUserName] = useState('');
  const [password , setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [inputIDFocus, setInputIDFocus] = useState(false);
  const [inputPasswordFocus, setInputPasswordFocus] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const IDWrapStyle = inputIDFocus? styles.inputWrapFocus : styles.inputWrap;
  const passwordWrapStyle = inputPasswordFocus? styles.inputWrapFocus : styles.inputWrap;
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  var resizeLogoCircleAnim = useRef(new Animated.Value(LOGO_CIRCLE_HEIGHT)).current;
  var resizeLogoAnim = useRef(new Animated.Value(LOGO_WIDTH)).current;

  // run keyboard animation stuff
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      Animated.timing(resizeLogoCircleAnim,{
        duration: 700,
        toValue: LOGO_SMALL_CIRCLE_HEIGHT,
        useNativeDriver: false
      }).start();

      Animated.timing(resizeLogoAnim,{
        duration: 700,
        toValue: LOGO_SMALL_WIDTH,
        useNativeDriver: false
      }).start();
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(resizeLogoCircleAnim,{
        duration: 500,
        toValue: LOGO_CIRCLE_HEIGHT,
        useNativeDriver: false
      }).start();

      Animated.timing(resizeLogoAnim,{
        duration: 500,
        toValue: LOGO_WIDTH,
        useNativeDriver: false
      }).start();
    });


    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }
  ,[]);

  

  // login request
  const requestLogin = async () => {
    // console.log('=====requestLogin=====');
    // const configurationObject = {
    //   method: 'post',
    //   baseURL: ENDPOINT_BASE_URL,
    //   url: 'api/auth/login',
    //   data:{
    //     username:'sbadmin@gmail.com',
    //     password:'12345678'
    //   }
    // };

    // const response = await axios(configurationObject);
    // if(response.data !== undefined){
    //   await initPoolandWallet().then(()=>{
    //     console.log('request last step');
    //     console.log('response.accessTolen',response.data.accessToken);

    //     props.setLoginToken(response.data.accessToken);
        
    //     AsyncStorage.setItem('@userToken' , JSON.stringify(response.data.accessToken));
    //   });
    // }

    //use for test
    props.setLoginToken('tesst1234');


  };

  const onPressLogin = () => {
    try{
      setIsLoading(true);
      requestLogin();
      // setTimeout(()=>{
      //   props.navigation.navigate({
      //     name:'LicenseHome',
      
      //   });
      // },1000);

    }catch(error){
      console.log('error', error);
    }
  }

  const handleUserNameChange = (val) => {    
    if( val.trim().length >= 8 ) {
      setUserName(val);


      // setData({
      //     ...data,
      //     id: val,
      //     isPasswordValid: true
      // });
    } else {
      setUserName(val);



      // setData({
      //     ...data,
      //     id: val,
      //     isPasswordValid: false
      // });
    }
  }

  const handlePasswordChange = (val) => {
    // if( val.trim().length >= 8 ) {
    //   setData({
    //       ...data,
    //       pw: val,
    //       isPasswordValid: true
    //   });
    // } else {
    //   setData({
    //       ...data,
    //       pw: val,
    //       isPasswordValid: false
    //   });
    // }
    setPassword(val);

  }

  const onPwIconPress = () => {
    setPasswordShow(!passwordShow);
  }
  
  const onFreeVerify = () => {
    props.navigation.navigate({
      name:'Scan',
      params:{
        from:'Login',
        type:'Verify'
      }
    })
  }

  if(isLoading){
    return(
      <View style={styles.loadingWrap}>
        <ActivityIndicator size='large'></ActivityIndicator>
        <Text style={styles.loadingText}>正在處理登入資訊</Text>
      </View>
    )
  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <TouchableOpacity onPress={onFreeVerify} style={styles.freeVerify}>
          <MaterialCommunityIcons name='qrcode-scan' size={45} color='white'></MaterialCommunityIcons>
        </TouchableOpacity>
        <View style={styles.logoWrap}>
          <View style={styles.circleWrap}>
            <Animated.View style={[styles.circle, {height:resizeLogoCircleAnim, width:resizeLogoCircleAnim}]}>
              <Animated.Image 
                style={[styles.logo, {width:resizeLogoAnim, height:resizeLogoAnim}]}
                source={require('../../assets/images/CYLogo.png')}
                resizeMode="stretch"
              ></Animated.Image>
            </Animated.View>
          </View>
        </View>
        <Animatable.View
          animation="lightSpeedIn"
          duration={1000} 
          delay={100}
          style={styles.logoTextWrap}>
          <Text style={styles.logoText}>電子產權憑證平台</Text>
        </Animatable.View>
      </View>
      {/* <Animatable.View 
        animation="fadeInUpBig"
        style={styles.footer}> */}
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <View style={passwordWrapStyle}>
            <View style={styles.idInputIcon}>
              <Ionicons name='md-person-circle-sharp' size={25} ></Ionicons>
            </View>
            <View style={styles.pwInput}>
              <TextInput
                style={{padding:0, margin:0}}
                placeholder="請輸入身分證字號"
                onChangeText={(val) => {handlePasswordChange(val)}}
                onFocus={() => {setInputPasswordFocus(true)}}
                onBlur={() => {setInputPasswordFocus(false)}} 
                secureTextEntry={!passwordShow}
                value={password}             
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={onPressLogin}
          >
            <Text style={styles.loginBtnText}>開啟TwFido驗證</Text>
          </TouchableOpacity>

        </View>
      {/* </Animatable.View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    fontSize: 25,
    backgroundColor:'white',
    justifyContent:'flex-end',

  },
  header:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 30,
    backgroundColor:'#59B6C0',
    borderBottomRightRadius: 125,
    paddingHorizontal: 30
  },  
  freeVerify:{
    position:'absolute',
    top:10,
    right:10,
    borderRadius:50,
    padding:10,
  },
  loadingWrap:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText:{
    marginTop:10,
    fontSize:20,
    color:'black'
  },  
  logoWrap:{
    flex:2,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5,
  },
  circleWrap: {
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:"center",
    padding: 5,
    borderRadius: 1000,
    minHeight: 75
  },
  circle:{
    justifyContent:'center',
    alignItems:"center",
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 1000, 
  },
  logo:{
    alignItems: 'center',
  },
  logoTextWrap:{
    flex: 1,
  },
  logoText:{
    color:'#C7D444',
    fontSize: 40,
    fontWeight:'600'
    
  },  
  footer:{
    flex:1,
    backgroundColor: '#59B6C0',
  },

  inputContainer:{
    flex:2,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopLeftRadius: 125,
    paddingTop:75
  },
  inputWrap:{
    width: 250,
    borderBottomWidth: 1, 
    borderColor: 'black',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap:'nowrap',
    marginBottom: 25
  },  
  inputWrapFocus:{
    width: 250,    
    borderBottomWidth: 1, 
    borderColor: '#0f659d',    
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 25
  },  

  idIinput:{
    flex:5,
    borderWidth: 0,
    paddingBottom:0,
    width: 100,
    height:25
  },
  idInputIcon:{
    flex:1,
    height:25,
  },
  pwInput:{
    flex: 4,
    borderWidth: 0,
    paddingBottom:0,
    width: 100,
    height:25
  },
  passwordInputIcon:{
    flex:1,
    height:25
  },
  loginBtn:{
    borderWidth: 1,      
    borderColor: '#0f659d',
    borderRadius: 10,
    width:250,
    alignItems:'center',    
    paddingVertical:5,
  },
  loginBtnText:{
  }
});

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken,
  };
}

export default connect(mapStateToProps, {setLoginToken})(LoginScreen);