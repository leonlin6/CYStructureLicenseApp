import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
} from 'react-native';


const LicenseHome = (props) => {
  const puzzle_name = [
    '憑證列表','憑證被查驗紀錄','建立憑證'
  ]

  const onCredentialList = () => {
    props.navigation.navigate({
      name:'CredentialList',
      params:{
        from:'WalletScreen'
      }
    });
  }



  const onCreateCredential = () => {
    props.navigation.navigate('CreateCredential');
  }
  
  const onPressPersonal = () => {
    props.navigation.navigate('LicenseList');
  }
  
  const onPressCompany = () => {
    props.navigation.navigate('CompanyList');
  }

  const onVerifyLicense = () => {
    props.navigation.navigate('Scan');

  }

  const onLogout = () => {
    props.navigation.navigate('Logout');

  }

  const onReceiveLicense = () => {
    props.navigation.navigate({
      name:'LicenseQR'
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
          <Text style={styles.licenseAreaTitleText}>所屬單位</Text>
      </View>
      <View style={styles.licenseCategoryArea}>
        <View style={styles.iconArea}>
          <TouchableOpacity onPress={onPressPersonal} style={styles.iconGroup}>
            <Ionicons style={styles.icon} name='ios-body' size={40} ></Ionicons>
            <Text style={styles.iconText}>個人</Text>
          </TouchableOpacity>
          <View style={{borderWidth:1, height:60, borderColor:'#59B7BF'}}></View>
          <TouchableOpacity onPress={onPressCompany} style={styles.iconGroup}>
            <Ionicons style={styles.icon} name='ios-business' size={40} ></Ionicons>
            <Text style={styles.iconText}>公司代理</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnArea}>
        <View style={styles.puzzleContent}>
          <View style={styles.smallPuzzleArea}>
            <TouchableOpacity onPress={onVerifyLicense} style={styles.btn}>
              <Ionicons name='scan' size={60} color='white'></Ionicons>
              <View style={{borderWidth:1, height:60, borderColor:'#b8d9f4'}}></View>
              <Text style={styles.btnText}>查驗執照</Text>
              <Ionicons name='chevron-forward' size={60} color='white'></Ionicons>

            </TouchableOpacity>
            <TouchableOpacity onPress={onReceiveLicense} style={styles.btn}>
              <Ionicons name='qr-code-sharp' size={60} color='white'></Ionicons>
              <View style={{borderWidth:1, height:60, borderColor:'#b8d9f4'}}></View>
              <Text style={styles.btnText}>接收執照</Text>
              <Ionicons name='chevron-forward' size={60} color='white'></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLogout} style={styles.btn}>
              <Ionicons name='qr-code-sharp' size={60} color='white'></Ionicons>
              <View style={{borderWidth:1, height:60, borderColor:'#b8d9f4'}}></View>
              <Text style={styles.btnText}>登出</Text>
              <Ionicons name='chevron-forward' size={60} color='white'></Ionicons>
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
  },
  titleArea:{
    backgroundColor: 'white',

  },
  licenseAreaTitleText:{
    fontSize:30,
    color:'#59B7BF',
    marginLeft:20,
    
  },
  licenseCategoryArea:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    backgroundColor: 'white',
    alignItems:'center',
  },
  iconArea:{
    alignItems:'center',
    flexDirection:'row',
    borderColor:'#59B7BF',
    borderWidth:4,
    justifyContent:'center',
    borderRadius:10,
    paddingBottom:5
  },
  iconGroup:{
    width: 150,
    alignItems:'center',
  },
  icon:{
    marginTop:20,
    marginLeft:20,
    marginRight:20,
    color:'#59B7BF'
  },
  iconText:{
    color:'#737071',
    fontSize:18,
    marginLeft:20,
    marginRight:20
  },
  btnArea:{
    flex:4,
  },
  puzzleContent:{
    flex:1,
    padding: 5,
    flexDirection:'row'

  },
  smallPuzzleArea:{
    flex:1,
    justifyContent:'flex-start',
    backgroundColor:'#F5F5F5'
  },
  btn:{
    justifyContent:'space-around',
    alignItems:'center',
    flexDirection:'row',
    height:75,
    backgroundColor:'#59B6C0',
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 5,
    borderRadius:10,
    shadowColor: '#171717',
    shadowColor: 'black',
    shadowOpacity: 0.56,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 20,
    elevation: 5,
  },
  btnText:{
    fontSize:25,
    color:'white',
    fontWeight:'bold'
  }
});

export default LicenseHome;