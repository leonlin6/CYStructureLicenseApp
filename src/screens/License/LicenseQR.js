import React, {useState, useEffect} from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

//redux
import {connect} from 'react-redux';

//api
import { ENDPOINT_BASE_URL } from '../../APIs/APIs';
import axios from 'axios';
// actions
import {setProofReq, setVerifyId} from '../../actions/index'

const LicenseQR = (props) => {

  const CYLogo =require('../../assets/images/CYLogo.png');

  const generateQRUrl =  () => {
    console.log('====props.route.params====', props.route.params);
    //use for test
    // let url = `${ENDPOINT_BASE_URL}/api/v1/qrcode/${props.route.params.qrId}`;
    let url = `https://www.google.com`;

    console.log('url', url);
    return url;
  }

  const onHomePress = () => {
    props.navigation.reset({
      index:0,
      routes: [
        {
          name:'LicenseHome',

        },
      ]
    });
  }

  // render page
  return (
      <View style={{flex:1}}>
        <View style={styles.container}>
          <View style={styles.QRArea}>
            <QRCode 
              value={generateQRUrl()}
              logo={CYLogo}
              logoSize={50}
              size={200}></QRCode>
          </View>
          <View style={styles.footer}>
            <Text style={styles.info}>掃描此QR Code以查驗執照</Text>
            <View style={styles.buttonArea}>
              <TouchableOpacity
                style={styles.btn}
                onPress={onHomePress}>
                <Text style={styles.btnText}>回到首頁</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,

  },
  QRArea:{
      flex:2,
      justifyContent:'space-evenly',
      alignItems:'center',
  },
  info:{
    textAlign:'center',
    marginBottom:5,
    fontSize:20

  },
  expiredDate:{
    textAlign:'center',
    marginBottom:20,
    color:'#2196f3',
    fontSize:20
  },
  footer:{
      flex:1,
      alignItems:'center',
      padding:20

  },
  logo:{
    height:325,
    width:300
  },
  buttonArea:{
    flex:1,
    paddingTop:20,
    justifyContent:'center',
    alignItems:'center'
  },
  btn:{
    backgroundColor:'#59B6C0',
    borderRadius: 20,
    width:350,
    alignContent:'center',    
    justifyContent:'center',

    flexDirection:'row',
    paddingVertical:5,
  },
  btnText:{
    color:'white',
    fontSize:20
  }

});

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken,


  };
}

export default connect(mapStateToProps,{setProofReq, setVerifyId})(LicenseQR);