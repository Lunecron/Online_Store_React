import {MongoClient} from "mongodb";
import * as dotenv from "dotenv";


dotenv.config();
let client;
const dbURI = process.env.MONGODB_URI || "";

export const initializeDBConnection = async ()=>{
    if(!dbURI) console.log("Unable to access dbUri...")
    try {
        client = await MongoClient.connect(dbURI, {});
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
}

export const getDbConnection = dbName => client.db(dbName);

