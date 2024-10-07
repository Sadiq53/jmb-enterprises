import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; // Added FontAwesome5 for additional icons
import { handleGetData, handleGetUserData } from '../services/UserDataService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const IndexScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [holdVehicles, setHoldVehicles] = useState([]);
  const [releaseVehicles, setReleaseVehicles] = useState([]);
  const [inYardVehicles, setInYardVehicles] = useState([]);
  const [rawFileData, setRawFileData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For filtered search results
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state

  const navigation = useNavigation();

  // Fetch data when the component mounts
  useEffect(() => {
    async function setData() {
      setLoading(true); // Start the loader
      try {
        const data = await handleGetData();
        const files = data.map(({ data }) => data).flat();
        setRawFileData(files);
        setFilteredData(files); // Initialize filtered data with all vehicles

        const holdFileData = files?.filter(value => value.ACTION === 'Hold');
        const releaseFileData = files?.filter(value => value.ACTION === 'Release');
        const yardFileData = files?.filter(value => value.ACTION === 'In Yard');
        setHoldVehicles(holdFileData);
        setReleaseVehicles(releaseFileData);
        setInYardVehicles(yardFileData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop the loader
      }
    }
    setData();
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const ID = await AsyncStorage.getItem('UserToken');
        const data = await handleGetUserData(ID);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, []);

  // Filter the data based on search query
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(rawFileData);
    } else {
      const filtered = rawFileData.filter(item => {
        const regdNum = item?.REGDNUM?.toString() || ''; // Ensure REGDNUM is a string
        return regdNum.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredData(filtered);
    }
  }, [searchQuery, rawFileData]);

  const handleItemPress = (fileData) => {
    navigation.navigate('VehicleDetails', { fileData });
  };

  const handleSearchChange = (text) => {
    if (searchQuery.length > text.length) {
      // If backspace is pressed, clear the input
      setSearchQuery('');
    } else {
      // If more than 4 digits are entered, clear the previous input and set the 5th digit as the new search query
      if (text.length > 4) {
        const updatedText = text.slice(-1); // Get the last (5th) digit only
        setSearchQuery(updatedText); // Set the 5th digit as the new input
      } else {
        setSearchQuery(text); // Otherwise, update the input normally
      }
    }
  };

  const handleLogout = () => {
    navigation.navigate('LogOut');
  };

  const renderVehicleItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.itemContainer}>
      <Text style={styles.itemText}>Vehicle no.</Text>
      <Text style={styles.vehicleNo}>{item.REGDNUM}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.flex}>
          <View>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.nameText}>{userData ? userData?.member_name : ''}</Text>
          </View>
          <View style={styles.locationContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="white" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
            <View style={styles.locBox}>
              <Ionicons name="location" size={20} color="black" />
              <Text style={styles.locationText}>Your Location</Text>
            </View>
          </View>
        </View>

        <View style={styles.grid}>
          <StatusCard title="In Yard" icon={'warehouse'} count={inYardVehicles?.length} color="#4CAF50" navigation={navigation} type="In Yard"/>
          <StatusCard title="Release" icon={'truck'} count={releaseVehicles?.length} color="#FF9800" navigation={navigation} type="Release"/>
          <StatusCard title="Hold" icon={'hand-paper'} count={holdVehicles?.length} color="#F44336" navigation={navigation} type="Hold"/>
        </View>
      </View>

      <Text style={styles.subText}>Search vehicle by chassis or vehicle number</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={text => handleSearchChange(text)}
          keyboardType="numeric"
          maxLength={5}
        />
      </View>

      {/* Show loader while data is being fetched */}
      {loading ? (
        <ActivityIndicator size="large" color="#e32636" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderVehicleItem}
          keyExtractor={(item, index) => item?.REGDNUM || index.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </ScrollView>
  );
};

const StatusCard = ({ title, icon, count, color, navigation, type }) => {
  const handlePress = () => {
    navigation.navigate('statusDetails', { statusType: type });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <FontAwesome5 name={icon} size={30} color={color} style={styles.cardIcon} />
      <Text style={[styles.cardCount, { color }]}>{count}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 10,
    backgroundColor: '#e32636',
    padding: 20,
    paddingTop: 50,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    justifyContent: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 20,
  },
  nameText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  locBox: {
    flexDirection: 'row',
  },
  locationText: {
    color: 'yellow',
    fontSize: 16,
    marginLeft: 5,
  },
  subText: {
    color: '#000',
    fontSize: 14,
    marginTop: 30,
    textAlign: 'left',
    marginBottom: 0,
    marginLeft: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 20,
    marginTop: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 10,
  },
  card: {
    width: '30%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    marginTop: 10,
  },
  flex: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexBasis: '47%',
    flexGrow: 1,
    flexShrink: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemText: {
    color: '#888888',
    fontSize: 14,
    marginBottom: 8,
  },
  vehicleNo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  loader: {
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6347',
    padding: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
});
