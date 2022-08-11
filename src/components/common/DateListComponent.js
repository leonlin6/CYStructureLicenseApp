import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ListItem } from '@rneui/themed'
import Ionicons from 'react-native-vector-icons/Ionicons';

const DateListComponent = props => {
  const [list , setList] = useState([]);
  const [currentYear , setCurrentYear] = useState();

  const testData = [
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁雪喬股份有限公司門禁',
      type:'使用'
    },
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'建造'
    },    
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'拆除'
    },    
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'雜項'
    },
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'建造'
    },    
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'拆除'
    },
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'建造'
    },    
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'拆除'
    },
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'建造'
    },    
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'拆除'
    },
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'建造'
    },    
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'拆除'
    },
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'建造'
    },    
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'拆除'
    },
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'建造'
    },    
    {
      date:'民國106年10月5日',
      credName:'雪喬股份有限公司門禁',
      type:'拆除'
    }
  ]

  //現在收陣列包object資料
  useEffect(() => {
    // setList(props.data);

    //use for test
    setList(testData);
  },[props.data]);

 




  // pageType: DefinitionDetail、CredentialDetail
  const onPressItem = (item) => {
    console.log('===slectCredentialData', item);
    props.navigation.navigate({
      name:'LicenseDetail',
      params:{

        licenseData:item
      }
    })
  }



  const listContent = 
  (
    <ScrollView >
      {
        list === undefined ? 
        (
          null
        )
        :
        (
          list.map((item, index) => (
            <TouchableOpacity key={index} onPress={()=>{onPressItem(item)}} >      
              <ListItem topDivider bottomDivider>
                <View style={styles.typeIcon}>
                  <Text style={styles.typeText}>{item.type}</Text>
                </View>
                <ListItem.Content>
                  <ListItem.Title>
                    {item.credName}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    {item.date}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>      
          ))
        )
      }
    </ScrollView>
  )

  return listContent;
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  typeIcon:{
    borderWidth:1,
    borderRadius:10,
    width:50,
    height:50,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  typeText:{
    fontSize:20
  }

});
  

export default DateListComponent;