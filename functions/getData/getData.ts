import dotenv from 'dotenv';
import { Handler } from '@netlify/functions';
import VaultSafeModel from '../vaultSafeModel';
import mongoose, { ConnectOptions } from 'mongoose';

export const handler: Handler = async () => {
  try {
    dotenv.config({
      path: "functions\\.env",
    });

    const MongoUri: string = process.env.MONGO_URI || '';

    mongoose
      .connect(MongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.log(err));

    const vaultSafeObjects = await VaultSafeModel.find({});

    return { statusCode: 200, body: JSON.stringify(vaultSafeObjects) };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
