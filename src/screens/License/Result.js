import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Colors } from '../../components/common/Colors';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { ListItem } from '@rneui/themed'

const Result = (props) => {

  const list = {
    '執照字號': '(105)嘉水鄉建執字第00038號',
    '持有人': 'leon',
    '執照類別': '使用執照',
    '轉移日期': '2022/04/26 13:12:33',
  }

  const DetailList = () => {

    const tempList = Object.keys(list).map((ruleKey, ruleIndex) => {
      return (
        <ListItem key={`rule${ruleIndex}`} containerStyle={{backgroundColor:'#F4F4F4'}}>
          <ListItem.Content>
            <View style={styles.subtitleView}>
              <Text style={styles.key}>{`${ruleKey}`}</Text>
              <Text style={styles.value}>{`${list[ruleKey]}`}</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      )
    })

    return tempList;
  }

  const onHomePress = () => {
    props.navigation.reset({
      index:0,
      routes: [
        {
          name:'LicenseHome'
        }
      ]
    });
  }


  return(
    <View style={styles.container}>
      {
        props.route.params.result === true ? (
          <View style={styles.imageArea}>
            <Ionicons name='ios-checkmark-circle' color={Colors.successGreen} size={175}></Ionicons>
            <Text style={styles.imageAreaText}>已驗證成功</Text>
          </View>
        )
        :
        (
          <View style={styles.imageArea}>
            <Ionicons name='ios-close-circle' color={Colors.failRed} size={175}></Ionicons>
            <Text style={styles.imageAreaText}>驗證失敗</Text>
          </View>
        )
      }
      
      <View style={styles.listArea}>
        <ScrollView persistentScrollbar={true}>
          <DetailList/>
        </ScrollView>
      </View>
      <View style={styles.buttonArea}>
        <TouchableOpacity
          style={styles.btn}
          onPress={onHomePress}>
          <Text style={styles.btnText}>回到首頁</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    padding:20,
    flex:1
  },
  imageArea:{
    justifyContent:'center',
    alignItems:'center',
    flex:2
  },
  imageAreaText:{
    fontSize:25,
    color:'black',
    fontWeight:'bold'
  },
  listArea:{
    flex:3,
    marginTop:20

  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
    justifyContent:'space-between',
    borderBottomWidth:1,
  },
  key:{
    flex:1,
    textAlign:'left',
  },
  value:{
    flex:1,
    textAlign:'right'
  },
  buttonArea:{
    flex:1,
    paddingTop:20,
    justifyContent:'center',
    alignItems:'center'
  },
  btn:{
    backgroundColor:'#2196f3',
    borderRadius: 20,
    width:150,
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
  

export default Result;