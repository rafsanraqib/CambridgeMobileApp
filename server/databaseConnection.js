//The code uses the Mongoose package to connect to a MongoDB database,
//using the connection string specified in the environment variable MONGO_UI.
//If there is an error while connecting, it will log the error message to the console.
//Once the connection is established, it will log a message to the console indicating that
//the database is now connected.
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const app = express();
const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
PORT = 3001;
MONGO_UI =
  "mongodb+srv://rafsanraqib:notpassword@cluster0.ucdmky5.mongodb.net/cambridge_transportations";
USERID = "rafsan97";
USEREMAIL = "raqibahmed035@gmail.com";

const client = new MongoClient(MONGO_UI);

app.listen(PORT, () => console.log("listening on the port", PORT));

app.get("/getTasks", async (req, res) => {
  const userId = req.query.username;
  const result = await run(userId);
  res.send(result);
});

app.get("/getUser", async (req, res) => {
  const userId = req.query.userId;
  const password = req.query.password;
  const user = await getUserCredentials(userId);
  const isUserVerified = await verifyUser(user, password);
  res.send(isUserVerified);
});

app.post("/setDriverLocation", async (req, res) => {
  console.log(req.body);
});

const verifyUser = async (user, password) => {
  if (user.length == 0) {
    return false;
  }
  const passwordFromRecords = user[0].userPassword;
  return passwordFromRecords === password;
};
const db = client.db("cambridge_transportations");

async function getUserCredentials(userId) {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("cambridge_transportations");
    const coll = db.collection("users");

    // find code goes here
    const userData = await coll.find({ userId: userId }).toArray();
    return userData;
    // iterate code goes here
    // await console.log(cursor.toArray);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
async function run(username) {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("cambridge_transportations");
    const coll = db.collection("patients");

    // find code goes here
    const patientPickupData = await coll
      .find({ assignedDriverId: username })
      .toArray();
    return patientPickupData;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
