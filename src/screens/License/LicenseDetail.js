import React, {useEffect, useState, useReducer} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  ActivityIndicator, 
  Image,
  SectionList
} from 'react-native';
  
import { ListItem, Dialog,} from '@rneui/themed'

import axios from 'axios';

// redux
import {connect} from 'react-redux';
import LoadingComponent from '../../components/common/LoadingComponent';
//API
import { ENDPOINT_BASE_URL } from '../../APIs/APIs';


const LicenseDetail = (props) => {
  const [fromPage, setFromPage] = useState('VerifyCertificationScan');
  const [showLoading, setShowLoading] = useState(false);
  const [showInitLoading, setShowInitLoading] = useState(true);
  const [list, setList] = useState([]);



  const detail = {

    "執照類別": "使用執照",
    "核發執照字號": "(54)嘉府茂建土使字第00063號",
    "原領執照字號": "(54)嘉府茂建土執字第00063號",
    "變更設計次數": "00",
    "基地面積": "0㎡",
    "建築面積": "16.2㎡",
    "總樓地板面積": "0㎡",
    "建築物高度": "0ｍ",
    "地下避難面積": "0㎡",
    "法定空地面積": "0㎡",
    "建造類別": "新建",
    "構造別": "木構造",
    "地上層數": "1層",
    "地下層數": "0層",
    "棟數": "1棟",
    "戶數": "1戶",
    "起造人代表人": "台灣ＯＯＯＯＯＯＯＯＯＯ ",
    "設計人": "",
    "監造人": "",
    "承造人": "",
    "雜項工作物": "",
    "停車空間": "法定0輛，獎勵0輛，自設0輛",
    "發照日期": "054年02月27日",
    "實際開工日期": "年月日",
    "竣工日期": "054年02月13日",
    "qtime": "05402",

    "縣市別": "嘉義縣"
  }

  const detailData = {
    "_id": {
      "$oid": "62f195a409abc0ebfd1a37b4"
    },
    "執照類別": "建造執照",
    "核發執照字號": "(058)工建字第00564號",
    "原領執照字號": "",
    "變更設計次數": "00",
    "基地面積": "0㎡",
    "建築面積": "0㎡",
    "總樓地板面積": "0㎡",
    "建築物高度": "0ｍ",
    "地下避難面積": "0㎡",
    "法定空地面積": "0㎡",
    "建造類別": "新建",
    "構造別": "加強磚造",
    "地上層數": "0層",
    "地下層數": "0層",
    "棟數": "1棟",
    "戶數": "0戶",
    "起造人代表人": "林黃Ｏ",
    "起造人地址": "新竹ＯＯＯＯＯＯＯＯＯ ",
    "設計人": "徐世能",
    "監造人": "",
    "承造人": "",
    "雜項工作物": "",
    "停車空間": "法定0輛，獎勵0輛，自設0輛",
    "發照日期": "058年08月26日",
    "實際開工日期": "年月日",
    "竣工日期": "年月日",
    "土地使用分區": "",
    "建築物用途": "店舖及住房",
    "工程造價": "",
    "qtime": "05808",
    "樓層概要": [
      {
        "樓層別": "地上001層",
        "樓層高度": "0ｍ",
        "樓層面積": "78.028㎡",
        "樓層用途": "店舖及住房"
      },
      {
        "樓層別": "地上002層",
        "樓層高度": "0ｍ",
        "樓層面積": "78.028㎡",
        "樓層用途": "店舖及住房"
      }
    ],
    "地號": [
      {
        "行政區": "新竹市",
        "地段": "北門段",
        "地號母號": "0164",
        "地號子號": "0056"
      },
      {
        "行政區": "新竹市",
        "地段": "北門段",
        "地號母號": "0165",
        "地號子號": "0028"
      }
    ],
    "門牌": [
      {
        "戶號": "",
        "行政區": "",
        "村里鄰": "",
        "路街段巷弄": "",
        "號": "",
        "樓": ""
      }
    ],
    "縣市別": "新竹市"
  }


  useEffect(()=>{
    handleLicenseData(detailData);
    const loadingTimeout = setTimeout(()=>{
      setShowInitLoading(false);
    },
    500);

    return(() => {
      clearTimeout(loadingTimeout);
    })
  },[]);

  //處理存的是陣列的物件
  const multipleArrayList = (array) => {
    
    const finalList = array.map((arrayItem, arrayIndex) => {

      const aaa = Object.keys(arrayItem).map((itemKey, itemKeyIndex)=>{
        console.log('----itemKey---',itemKey);
        console.log('----arrayItem[itemKey]---',arrayItem[itemKey]);

        return(
          <ListItem key={`itemKeyIndex${arrayIndex}${itemKeyIndex}`} containerStyle={{backgroundColor:'#F4F4F4'}}>
            <ListItem.Content>
                <View style={[styles.subtitleView,{borderColor:'red'}]}>
                  <Text style={styles.key}>{itemKey}</Text>
                  <Text style={styles.key}>{arrayItem[itemKey]}</Text>
                </View>
              </ListItem.Content>
          </ListItem>
        )
      })
      return aaa;

    });


    console.log('---finalist---',finalList);
    return finalList;
  }
  

  //處理license detail資料
  const handleLicenseData = (data) => {
    console.log('---handleData---', data);
    const filteredDataKey = Object.keys(data).filter((item) => {
      return item !== '_id' && item!== 'qtime';
    })
    console.log('---filteredDataKey---', filteredDataKey);

    const processedList = filteredDataKey.map((key, index) => {
      //license data的value是單值
      if(typeof data[key] === 'string'){
        console.log('string data[key]', data[key]);
        return(
          <ListItem key={index} containerStyle={{backgroundColor:'#F4F4F4'}}>
            <ListItem.Content>
              <View style={styles.subtitleView}>
                <Text style={styles.key}>{key}</Text>
                <Text style={styles.value}>{data[key]}</Text>
              </View>
            </ListItem.Content>
          </ListItem>
        )
      //license data的value是陣列包object，另外處理
      }else if(typeof data[key] === 'object'){
        console.log('array data[key]', data[key]);
        console.log('array key', key);

        return (
          <>
            <ListItem key={index} containerStyle={{backgroundColor:'#F4F4F4'}}>
              <ListItem.Content>
                  <View style={[styles.subtitleView,{borderBottomWidth:0}]}>
                    <Text style={[styles.key,{fontSize:18}]}>{key}</Text>
                  </View>
                </ListItem.Content>
            </ListItem>
            {
              multipleArrayList(data[key])
            }
          </>
        )
          

      }else{
        return null;
      }
    });
    // console.log('---processedList---', processedList);
    setList(processedList);
  }

  const onVerifyLicense = () => {
    props.navigation.navigate({
      name:'LicenseQR'
    })
  }


  const DetailList = () => {
    let i = 0;
    const list2 = Object.keys(detail).map((item, index) => {
      return(
        <ListItem key={index} containerStyle={{backgroundColor:'#F4F4F4'}}>
          <ListItem.Content>
            <View style={styles.subtitleView}>
              <Text style={styles.key}>{item}</Text>
              <Text style={styles.value}>{detail[item]}</Text>
            </View>
          </ListItem.Content>
        </ListItem>
      )
    })
    return list2;
  }

  //render page
  return (
    <View style={{flex:1}}>
    {
      showInitLoading === true ? (
        <View style={[styles.container,{justifyContent:'center'}]}>
          <ActivityIndicator size="large" />
        </View>      
      )
      :
      (
        <View style={styles.container}>
          <View style={styles.detailArea}>
            <ScrollView persistentScrollbar={true} >
              {list}
            </ScrollView>
          </View>
          <View style={styles.buttonArea}>
            <TouchableOpacity onPress={onVerifyLicense} style={styles.btn}>
                <Ionicons name='ios-qr-code-outline' size={60} color='#59B6C0'></Ionicons>
                <Text style={{color:'black'}}>查驗此執照</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    padding:20,
    flex:1
  },
  imageArea:{
    flex:2,
    justifyContent:'center',
    alignItems:'center'
  },

  image:{
    height:150,
    width:200,
    margin:20,
    marginTop:0,
    paddingTop: 20,

  },

  nameArea:{
    flex:1,
    width:200,
    justifyContent:'flex-end',
    paddingLeft:10,
    paddingBottom: 10
  },
  credentialName:{
    color:'white',
  },
  detailArea:{
    flex:4,

  },

  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent:'space-between',
    borderBottomWidth:1,
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  key:{
    flex:1,
    textAlign:'left',
    flexDirection:'column',
    justifyContent:'flex-end',
    alignItems:'flex-end',
  },
  value:{
    flex:1,
    textAlign:'right'
  },
  buttonArea:{
    flex:1,
    marginTop: 30,
    paddingTop:20,
    borderTopWidth:1,
    borderTopColor:'gray',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  btn:{
    justifyContent:'center',
    alignItems:'center',
  }
});

const mapStateToProps = (state) => {  
  return {

  };
}

export default connect(mapStateToProps)(LicenseDetail);
