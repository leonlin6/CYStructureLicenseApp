import React, {useEffect, useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { 
  View, 
  Text,  
  StyleSheet, 
  TouchableOpacity,
  ScrollView
} from 'react-native';


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

  const [showDrawerMenu, setShowDrawerMenu] = useState(false);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>請選擇代理公司</Text>
      <ScrollView persistentScrollbar={true}>
        <Companies></Companies>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    fontSize: 25,
    justifyContent:'center',
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

  }
});


export default CompanyList;