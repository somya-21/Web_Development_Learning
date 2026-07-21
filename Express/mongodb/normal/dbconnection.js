const {MongoClient}=require('mongodb')
let url="mongodb+srv://demo:demo@cluster0.bib29cp.mongodb.net/?appName=Cluster0";
let db;
let client;

const connectDB = async () => {
  try {
    client = new MongoClient(url);//conection create

    await client.connect();//coonect krna

    db = client.db("Demo Database");//create database

    console.log("MongoDB Connected");

    return db;
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }


};

module.exports = { connectDB };