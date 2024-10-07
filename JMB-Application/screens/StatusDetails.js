import React, { useEffect, useState } from 'react';
import { handleGetData } from '../services/UserDataService';
import { FlatList, ScrollView, TouchableOpacity, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icons for back button and search
import { useNavigation } from '@react-navigation/native';

const StatusDetails = ({ route }) => {
    const { statusType } = route.params;
    const [searchQuery, setSearchQuery] = useState('');
    const [actionVal, setActionVal] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // For filtered data after search
    const [loading, setLoading] = useState(true); // Loader state
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchActionData() {
            setLoading(true); // Start the loader
            const actionData = await handleGetData();
            const files = actionData.map(({ data }) => data).flat();
            const holdFileData = files?.filter(value => value.ACTION === statusType);
            setActionVal(holdFileData);
            setFilteredData(holdFileData); // Initialize with full data
            setLoading(false); // Stop the loader
        }
        fetchActionData();
    }, []);

    // Handle search input change with validation for 4 digits
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

    // Clear the search query instantly, not character by character
    const handleClearSearch = () => {
        setSearchQuery('');
    };

    // Filter the data based on search query
    useEffect(() => {
        const filtered = actionVal.filter(item => item.REGDNUM.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredData(filtered);
    }, [searchQuery, actionVal]);

    // Navigate to details page
    const handleItemPress = (fileData) => {
        navigation.navigate('VehicleDetails', { fileData });
    };

    const renderVehicleItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.itemContainer}>
            <Text style={styles.itemText}>Vehicle no.</Text>
            <Text style={styles.vehicleNo}>{item.REGDNUM}</Text>
        </TouchableOpacity>
    );

    return (
        <>
            {/* Custom Header with Search and Back Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by Registration Number"
                    placeholderTextColor="white"
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    keyboardType="numeric" // Only allow numeric input
                    maxLength={5} // Limit input length to 4 characters
                />
                {searchQuery.length > 0 ? (
                    <TouchableOpacity onPress={handleClearSearch}>
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                ) : (
                    <Ionicons name="search" size={24} color="white" />
                )}
            </View>

            <ScrollView style={styles.container}>
                {/* Display loader until data is fetched */}
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
        </>
    );
};

export default StatusDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#e32636', // Your theme color
        padding: 15,
        paddingTop: 40, // Add some padding for status bar (for devices with a notch)
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchInput: {
        flex: 1,
        height: 40,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#ff4f4f', // Slightly lighter shade for the search bar
        color: 'white',
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
});
