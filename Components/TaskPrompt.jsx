import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default TaskPrompt = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.pricingOption}>
          <Text style={styles.pricingOptionTitle}>Ken Snow</Text>
          <Text style={styles.pricingOptionPrice}>Alina Health</Text>
          <Text style={styles.pricingOptionPrice}>11:35 PM</Text>
          <Text style={styles.pricingOptionDescription}>
            I am at the back of the building
          </Text>
          <View style={styles.pricingOptionButtonContainer}>
            <Text
              style={styles.pricingOptionButton}
              onPress={() => navigation.navigate("Tasks")}
            >
              Accept Task
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  pricingOption: {
    margin: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  pricingOptionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pricingOptionPrice: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  pricingOptionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  pricingOptionFeatures: {
    marginBottom: 10,
  },
  pricingOptionFeature: {
    fontSize: 14,
    color: "#999",
  },
  pricingOptionButtonContainer: {
    backgroundColor: "#00BFFF",
    borderRadius: 5,
  },
  pricingOptionButton: {
    fontSize: 14,
    color: "#fff",
    padding: 10,
  },
});
