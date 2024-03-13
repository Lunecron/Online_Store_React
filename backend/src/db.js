import {MongoClient} from "mongodb";
let client;
const dbURI = "mongodb+srv://lunecron:ycOLHkeIaRrjkOCc@cluster0.y9hfdy7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const initializeDBConnection = async ()=>{
    
    try {
        client = await MongoClient.connect(dbURI, {});
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
}

export const getDbConnection = dbName => client.db(dbName);

