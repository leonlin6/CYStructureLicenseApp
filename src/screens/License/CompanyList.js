import React, {useEffect, useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { 
  View, 
  Text,  
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable
} from 'react-native';
import { Colors } from '../../components/common/Colors';



const CompanyList = (props) => {

  const companies = [
    {
      name:'信義房屋',
    },
    {
      name:'雪喬股份有限公司',
    },
    {
      name:'全聯超市',
    },
  ]

  const [modalVisible, setModalVisible] = useState(true);

  const onMenuPress = () => {
    if(showDrawerMenu === true)
    props.navigation.closeDrawer();
    else
    props.navigation.openDrawer();
  }

  const onSelectRule = (name) => {
    props.navigation.navigate({
      name:'LicenseList',
      params:{
        companyName: name
      }
    })
  }

  const Companies = () => {

    const company = companies.map((item, index)=>{
    console.log('item', item);
    return(
      <TouchableOpacity key={`template${index}`} onPress={() => {onSelectRule(item.name)}}>
      <View style={styles.blockBtn}>
        <Text style={styles.btnText}>{item.name}</Text>
        <Ionicons name='ios-chevron-forward-outline' size={30} ></Ionicons>
      </View>
      </TouchableOpacity>
    )
    })

    return company;
  }


  //Dialog control
  const onInfoOpen = () => {
    setModalVisible(!modalVisible);
  };

  const onModalConfirm = () => {
    setModalVisible(!modalVisible);
  }

  const NoticeModal = () => {
    return (
      <View style={styles.mask}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalTitleArea}>
                <Ionicons name='md-information-circle' size={30} color={Colors.buttonBlue}></Ionicons>
                <Text style={styles.modalTitleText}>提示</Text>
              </View>
              <View style={styles.modalSubtitleArea}>
                <Text style={styles.modalSubText}>若清單無法正確顯示代理公司，請聯絡該持照公司透過建築執照網站，將您設定為公司代理人。</Text>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>我知道了</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

    );
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>請選擇代理公司</Text>
        <TouchableOpacity onPress={onInfoOpen} >
          <Ionicons name='md-information-circle' size={30} color={Colors.buttonBlue}></Ionicons>
        </TouchableOpacity>
      </View>
      <ScrollView persistentScrollbar={true}>
        <Companies></Companies>
      </ScrollView>
      {
        modalVisible === true ? (
          <NoticeModal></NoticeModal>

        )
        :
        (
          null
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    fontSize: 25,
    justifyContent:'center',
  },
  titleArea:{
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
  },
  title:{
    fontSize:30,
    textAlign:'left',
    marginVertical:20,
    marginLeft:10
  },
  blockBtn:{
    justifyContent:'space-between',
    flexDirection:'row',
    marginHorizontal:20,
    padding:25,
    borderWidth:1,
    borderColor:'white',
    borderRadius:5,
    shadowColor: '#171717',
    shadowOpacity: 0.56,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 20,
    elevation: 5,
    backgroundColor: 'white',
    marginBottom:15
  },
  btnText:{
    fontSize:30,

  },
  mask:{
    flex:1, 
    backgroundColor:'black', 
    position:'absolute', 
    top:0, 
    bottom:0, 
    right:0, 
    left:0,
    opacity:0.5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitleArea:{
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
  },
  modalSubtitleArea:{

  },
  button: {
    borderRadius: 5,
    width:250,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
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
    fontSize:15,
    marginBottom: 15,
    textAlign: "left",
  }
});


export default CompanyList;