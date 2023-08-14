import dotenv from 'dotenv'
import { Handler, HandlerEvent } from '@netlify/functions'
import VaultSafeModel from '../vaultSafeModel';
import mongoose, {ConnectOptions} from 'mongoose';
export const handler: Handler = async (event: HandlerEvent) => {
  try {
    dotenv.config({
      path: "functions\\.env",
    });
    if (event.body === null) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request body' })
      };
    }
    const MongoUri: string = process.env.MONGO_URI || '';
    mongoose
      .connect(MongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.log(err));
      
      console.log(event)
    const body = JSON.parse(event.body);
    const { _id, tabId } = body;
    await VaultSafeModel.updateMany(
      { _id },
      { $pull: { tabsList: { _id: tabId } } }
    );
    return { statusCode: 200, body: JSON.stringify({ statusCode: 200, ...(await VaultSafeModel.findOne({_id})).toObject() }) };
  } catch (error) {
    console.log(error)
    return { statusCode: 500, body: JSON.stringify({ statusCode: 500, ...error }) };
  }
}
