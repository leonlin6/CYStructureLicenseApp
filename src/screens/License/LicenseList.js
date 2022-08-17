import React, {useEffect, useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Dimensions
} from 'react-native';
import { 
  Tab,
  TabView 
} from '@rneui/themed';

import {connect} from 'react-redux';
import DateListComponent from '../../components/common/DateListComponent';
import { Picker, DatePicker } from 'react-native-wheel-pick';


const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;


const LicenseList = (props) => {
  let changedYear = useRef('所有年度');
  const [index, setIndex] = useState(0);
  const [yearWheelShow, setYearWheelShow] = useState(false);
  const [wheelPickerData , setWheelPickerData] = useState([]);
  const [pickedYear , setPickedYear] = useState(['所有年度']);


  useEffect(() => {
    getYearArray();
  },[]);

  const getYearArray = () => {
    let currentYear = new Date().getFullYear();
    let yearArray = ['所有年度'];

    for(let i = currentYear; i >= currentYear-50; i--){
      yearArray.push(i);
    }
    setWheelPickerData(yearArray);
  }


 
  const onPressYearSelect = () => {
    setYearWheelShow(true);
    
  }

  const onSelectCompany = () => {

  }

  const onAccomplish = () => {
    setYearWheelShow(false);
    setPickedYear(changedYear.current );
  }


  // render page
  return (
    <View style={styles.container}>
      <Tab 
        value={index} 
        variant="primary" 
        indicatorStyle={{height:5, backgroundColor:'#59B6C0', borderRadius:10}}  
        containerStyle={{backgroundColor:'white'}}
        onChange={(e) => setIndex(e)}>
        <Tab.Item
          title='個人執照'
          titleStyle={(active) => ({
            color: active ? "#59B6C0" : 'black',
          })}
          containerStyle={(active) => ({
            backgroundColor: active ? "white" : 'undefined',
          })}
        >
        </Tab.Item>
        <Tab.Item
          title='所屬公司執照'
          titleStyle={(active) => ({
            color: active ? "#59B6C0" : 'black',
          })}
          buttonStyle={(active) => ({
            backgroundColor: active ? "white" : undefined,
          })}
        >
        </Tab.Item>
      </Tab>
      <TabView value={index} onChange={setIndex} animationType="spring">
        {/*for personal*/}
        <TabView.Item style={{ width: '100%' }}>
          <View style={styles.listArea}>
              <View style={styles.selectYearArea}>
                <TouchableOpacity onPress={onPressYearSelect} style={styles.selectBtn}>
                  <Ionicons name='calendar' size={30} color='white'></Ionicons>
                  <Text style={styles.year}>{pickedYear}</Text>
                  <Ionicons name='ios-caret-down-outline' size={10} color='white'></Ionicons>
                </TouchableOpacity>
              </View>
            <DateListComponent 
              displayType={'list'} 
              navigation={props.navigation} 
            /> 
          </View>
        </TabView.Item>
        {/*for company*/}
        <TabView.Item style={{ flex:1 }}>
          <View style={styles.listArea}>
            <View style={styles.selectCompanyArea}>
              <TouchableOpacity onPress={onSelectCompany} style={styles.selectCompanyBtn}>
                <Ionicons name='ios-business' size={40} color='white'></Ionicons>
                <Text style={styles.currentCompanyText}>雪喬股份有限公司雪喬股份有限公司</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.selectYearArea}>
              <TouchableOpacity onPress={onPressYearSelect} style={styles.selectBtn}>
                <Ionicons name='calendar' size={30} color='white'></Ionicons>
                <Text style={styles.year}>所有年度</Text>
                <Ionicons name='ios-caret-down-outline' size={10} color='white'></Ionicons>
              </TouchableOpacity>
            </View>
            <DateListComponent 
              displayType={'list'} 
              navigation={props.navigation} 
            /> 
          </View>
        </TabView.Item>
      </TabView>
      {
        yearWheelShow === true ? (
          <View style={styles.wheelArea}>
            <View style={styles.pickerAccomplishBtn}>
              <TouchableWithoutFeedback onPress={onAccomplish} >
                <Text style={styles.pickerAccomplishText}>完成</Text>
              </TouchableWithoutFeedback>
            </View>
            <Picker
              style={{ backgroundColor: 'white', width: 400, height: 215 , }}
              selectedValue={pickedYear}
              pickerData={wheelPickerData}
              onValueChange={value => { changedYear.current = value }}
            />
          </View>
        )
        :
        (null)
      }
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  title:{
    flex:8,
    fontSize:30
  },
  listArea:{
    flex:7,
    backgroundColor:'#F5F5F5'
  },
  selectCompanyArea:{
    borderColor:'black',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    backgroundColor:'#59B6C0',
    marginTop:20,
    marginHorizontal:30,

    shadowColor: '#171717',
    shadowColor: 'black',
    shadowOpacity: 0.86,
    shadowOffset: { width: 10, height: 11},
    shadowRadius: 20,
    elevation: 8,
  },
  selectCompanyBtn:{
    flexDirection:'row',
    padding:5,
    justifyContent:'center',
    alignItems:'center'
  },
  currentCompanyText:{
    width:250,
    fontSize:25,
    marginLeft:10,
    color:'white',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center'
  },
  selectYearArea:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#59B6C0',
    height:40,
    marginTop:20,
  },
  selectBtn:{
    flexDirection:'row', 
    justifyContent:'center', 
    alignItems:'center'
  },
  year:{
    fontSize:18,
    paddingLeft:15,
    paddingRight:10,

    color:'white'
  },
  wheelArea:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    flex:1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent:'flex-end',
  },
  pickerAccomplishBtn:{
    backgroundColor:'red',
    flexDirection:'row',
    backgroundColor:'white',
    justifyContent:'flex-end',

  },
  pickerAccomplishText:{
    backgroundColor:'white',
    padding:10,
    color:'#59B6C0',
    fontSize:20
  }
});

const mapStateToProps = (state) => {  
  return {
  };
}

export default connect(mapStateToProps)(LicenseList);