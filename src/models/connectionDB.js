import { MongoClient } from "mongodb";
import { mongoDBConfig } from "../config.js";

export async function connectMongo() {
  try {
    const client = new MongoClient(
      `mongodb+srv://Carlos:${mongoDBConfig.PASS}@tfg.a12jv.mongodb.net/?retryWrites=true&w=majority&appName=TFG`
    );
    await client.connect();
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error conectando a MongoDB: ${error.message}");
    throw error;
  }
}
