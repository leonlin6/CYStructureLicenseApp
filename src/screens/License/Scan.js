
import React, {useState, useEffect} from 'react';
import { 
  View, 
  Text,  

  StyleSheet, 
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Pressable

} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../components/common/Colors';

// redux
import {connect} from 'react-redux';


//API
import { ENDPOINT_BASE_URL } from '../../APIs/APIs';
import axios from 'axios';


const Scan = (props) => {


  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const [isShowLoading, setIsShowLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(()=>{
    setIsShowLoading(false);
  },[])
  
  const onSuccessLoad = async () => {
    setModalVisible(!modalVisible);
  }

  const backButton = async () => {
    props.navigation.goBack();
  }

  //Dialog control
  const onModalConfirm = () => {
    setModalVisible(!modalVisible);
    props.navigation.reset({
      index:1,
      routes: [
        {
          name:'LicenseHome'
        },
        {
          name:'Result',
          params:{
            result:true
          }
        }
      ]
    });
  }

  const ConfirmModal = () => {
    return (
      <View style={styles.mask}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.questionArea}>
                <View style={styles.modalTitleArea}>
                  <Text style={styles.modalTitleText}>請確認是否轉移此執照</Text>
                </View>
                <View style={styles.modalSubtitleArea}>
                  <Text style={styles.modalSubText}>(105)嘉水鄉建執字第00038號</Text>
                </View>
              </View>
              <View style={styles.questionArea}>
                <View style={styles.modalTitleArea}>
                  <Text style={styles.modalTitleText}>接收執照者</Text>
                </View>
                <View style={styles.modalSubtitleArea}>
                  <Text style={styles.modalSubText}>Leon</Text>
                </View>
              </View>
              <View style={styles.buttonArea}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>取消</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonConfirm]}
                  onPress={onModalConfirm}
                >
                  <Text style={styles.textStyle}>確認</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>

    );
  };


  return (
    <View style={{flex:1}}>
    {
      isShowLoading ? 
      (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>      
      )
      :
      (
        <View style={styles.container}>

          <QRCodeScanner
            cameraStyle={{height:SCREEN_HEIGHT,width:SCREEN_WIDTH}}
            onRead={onSuccessLoad}
            flashMode={RNCamera.Constants.FlashMode.auto}
            showMarker={true}
            customMarker={
              <View style={{flex:1, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                <MaterialCommunityIcons name='scan-helper' style={styles.aimIcon} size={(SCREEN_HEIGHT * 0.475) }></MaterialCommunityIcons>
              </View>
            }
          />
          <TouchableOpacity onPress={backButton} style={{position:'absolute', top: 10, left: 10 ,borderRadius:100}}>
            <Ionicons 
              name = 'arrow-back-circle-sharp'
              size={50} 
              style={{color:'white'}}
            ></Ionicons>
          </TouchableOpacity>
          {
            modalVisible === true ? (
              <ConfirmModal></ConfirmModal>
            )
            :
            (null)
          }
        </View>
      )
    }
    </View>
  );
}


const styles = StyleSheet.create({
  body:{
  },
  container:{
    flex:1,
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center'
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16,
    backgroundColor: 'yellow'
  },

  aimIcon:{
    color:'white',
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    fontWeight: '100'
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  mask:{
    backgroundColor:'black', 
    position:'absolute', 
    top:0, 
    bottom:0, 
    right:0, 
    left:0,
    opacity:0.5
  },
  centeredView: {
    flex:1,   
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,

  },
  modalView: {
    height:300,
    width:300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  questionArea:{
    flex:1,
  },
  modalTitleArea:{
    alignItems:'flex-start',
    justifyContent:'flex-start',
    flexDirection:'row',
  },
  modalSubtitleArea:{

  },
  buttonArea:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    flex:1,
  },
  button: {
    borderRadius: 5,
    width:100,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: 'red',

  },
  buttonConfirm: {
    backgroundColor: Colors.themeColor,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTitleText: {
    fontSize:20,
    
  },
  modalSubText: {
    fontSize:18,
    marginBottom: 15,
    textAlign: "left",
    color:'red'
  }
});

const mapStateToProps = (state) => {  
  return {
      loginToken: state.loginToken
  };
}

export default connect(mapStateToProps)(Scan);
