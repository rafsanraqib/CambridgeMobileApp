import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import axios from "axios";
import GLOBAL from "../Globals/Globals.js";
import * as Location from "expo-location";

export default RidesList = () => {
  const [rides, setRides] = useState([]);
  var latitude;
  var longitude;

  useEffect(() => {
    getTasks();
    const interval = setInterval(() => {
      getLocationData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getTasks = async () => {
    await axios
      .get("http://localhost:3001/getTasks", {
        params: {
          username: GLOBAL.USERNAME,
        },
      })
      .then((response) => setRides(response.data));
  };
  const getLocationData = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      console.log("Permission to access location was granted");
    }

    let location = await Location.getCurrentPositionAsync({});
    let longitude_ = location.coords.longitude;
    let latitude_ = location.coords.latitude;

    let isLatitudeChanged = latitude_ != latitude;
    let isLongitudeChanged = longitude_ != longitude;
    let isPositionChanged = isLatitudeChanged || isLongitudeChanged;
    latitude = latitude_;
    longitude = longitude_;
    updatedCoordinates = await createCoordinatedObject(latitude, longitude);
    console.log(updatedCoordinates);
    if (isPositionChanged) {
      console.log(updatedCoordinates);
      await axios.post(
        "http://localhost:3001/setDriverLocation",
        updatedCoordinates
      );
    }
  };

  const createCoordinatedObject = async () => {
    const updatedCoordinates_ = {
      driverLatitude: latitude,
      driverLongitude: longitude,
    };

    return updatedCoordinates_;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Current Tasks</Text>
      <FlatList
        data={rides}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              style={styles.image}
              source={{
                uri: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
              }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{item.patientName}</Text>
              <Text style={styles.phoneText}>{"Miles: 2.5"}</Text>
              <Text style={styles.phoneText}>{"Payout: $15"}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    backgroundColor: "#eee",
    padding: 8,
    marginTop: 60,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    marginLeft: 16,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  heading: {
    margin: 50,
    fontSize: 23,
  },
  phoneText: {
    fontSize: 16,
    color: "#999",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
