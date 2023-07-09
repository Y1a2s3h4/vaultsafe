import dotenv from 'dotenv'
import { Handler, HandlerEvent } from '@netlify/functions'
import VaultSafeModel from '../vaultsafeModal';
import mongoose from 'mongoose';
export const handler: Handler = async (event: HandlerEvent) => {
  try {
    dotenv.config({
      path: "functions\\.env",
    });
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.log(err));
      
    const body = JSON.parse(event.body);
    const {
      urlName,
      pswd,
      tabsList
    } = body;
    const vaultSafeObject = await VaultSafeModel.create({
      urlName,
      pswd,
      tabsList
    });
    vaultSafeObject.save();
    return { statusCode: 200, body: JSON.stringify(vaultSafeObject) };
  } catch (error) {
    console.log(error)
    return { statusCode: 500, body: JSON.stringify(error) };
  }
}
