import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo. If not, you can use react-native-vector-icons
import { useNavigation } from '@react-navigation/native';

const VehicleDetailScreen = ({ route }) => {

    const rawData = route.params
    const [userData, setUserData] = useState([])
    const navigation = useNavigation(); // Initialize navigation hook

    useEffect(()=>{
        // console.log(rawData)
        setUserData(rawData?.fileData)
    }, [])

  return (
     <>
         {/* Header */}
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
        <Ionicons name="arrow-back" size={30} color="white" style={styles.backIcon} />
        </TouchableOpacity>
        <View>
        <Text style={styles.headerTitle1}>
          <Text style={styles.headerId}>{userData?.REGDNUM}</Text> 
        </Text>
        <Text style={styles.headerTitle}>{userData?.CUSTOMERNAME}</Text>
        </View>
        <View>
          <View style={styles.actionLay}>
          <Text style={styles.actionLabel}>Hold : </Text>
          <Text style={styles.actionValue}>{userData?.HOLD !== 'empty' ? userData?.HOLD : "---"}</Text>
          </View>
          <View style={styles.actionLay}>
          <Text style={styles.actionLabel}>Release : </Text>
          <Text style={styles.actionValue}>{userData?.RELEASE !== 'empty' ? userData?.RELEASE : "---"}</Text>
          </View>
          <View style={styles.actionLay}>
          <Text style={styles.actionLabel}>In Yard : </Text>
          <Text style={styles.actionValue}>{userData?.IN_YARD !== 'empty' ? userData?.IN_YARD : "---"}</Text>
          </View>
        </View>
      </View>

      {/* Vehicle Details */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* <View style={styles.detailsContainer}> */}
          <View style={styles.detailRow1}>
            <View>
                <View style={{flexDirection : "row", alignItems : "center", justifyContent : "flex-start"}}>
                    <Ionicons name="location" size={24} color="red" /><Text style={styles.label}> BRANCH</Text>
                </View>
                <Text style={styles.value}>{userData?.BRANCH}</Text>
            </View>
            <View>
                <Text style={styles.label}>BANK NAME</Text>
                <Text style={styles.value}>{userData?.BANK}</Text>
            </View>
          </View>

          <View style={styles.detailRow2}>
            <View>
                <Text style={styles.agreementLabel}>AGREEMENT TO</Text>
                <Text style={styles.agreementValue}>{userData?.AGREEMENTNO}</Text>
            </View>
          </View>

          <Text style={styles.sectionHeader}>VEHICLE DETAILS</Text>

          <View style={styles.detailRow}>
            <Text style={styles.label}>ASSET DESC:</Text>
            <Text style={styles.value}>{userData?.ASSETSDESC}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>MAKE:</Text>
            <Text style={styles.value}>{userData?.MAKE}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>MODEL:</Text>
            <Text style={styles.value}>{userData?.MODELNUM}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>CHASIS NO: </Text>
            <Text style={styles.value}>{userData?.CHASISNUM}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>ENGINE NO:</Text>
            <Text style={styles.value}>{userData?.ENGINENUM}</Text>
          </View>
        {/* </View> */}
      </ScrollView>
    </View>
     </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d32f2f',
},
header: {
    backgroundColor: '#d32f2f', // Red color
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'left',
    // borderBottomEndRadius: 40,
    // borderBottomStartRadius: 40,
    gap : 20
  },
  backIcon: {
    marginRight: 15,
},
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  headerTitle1: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  headerId: {
      color: '#FFD700', // Yellow color
    },
  content: {
    borderTopEndRadius : 40,
    borderTopStartRadius : 40,
    padding: 20,
    backgroundColor : "#fff"
  },
  detailsContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    flex : 1
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    // borderBottomWidth : 1,
    paddingVertical : 10
  },
  detailRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth : 1,
    paddingVertical : 10,
    borderColor : "#ccc"
  },
  detailRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 10,
    borderBottomWidth : 1,
    // paddingVertical : 10,
    borderColor : "#ccc",
    paddingTop  : 20
  },
  label: {
    fontSize: 18,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: '#000',
    textAlign : "left"
  },
  agreementLabel: {
    fontSize: 18,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  agreementValue: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    fontWeight : "bold"
  },
  sectionHeader: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: 'white',
  },
  actionLay: {
    flexDirection : "row",
    gap : 10,
    alignItems : "center"
  },
  actionLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign : "left"
  },
  actionValue: {
    fontSize: 16,
    color: '#fff',
    textAlign : "left"
  }
});

export default VehicleDetailScreen;
