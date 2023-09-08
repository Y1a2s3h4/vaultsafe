import dotenv from 'dotenv';
import { Handler, HandlerEvent } from '@netlify/functions';
import VaultSafeModel from '../vaultSafeModel';
import mongoose, { ConnectOptions } from 'mongoose';

export const handler: Handler = async (event: HandlerEvent) => {
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
    
    const urlName = event?.queryStringParameters?.urlName;

    if(!urlName){
      const result = await VaultSafeModel.find({})
      return { statusCode: 200, body: JSON.stringify({ statusCode: 200, result })};
    } else {
      
      const result = (await VaultSafeModel.findOne({urlName}))
      if(!result){
        return { statusCode: 404, body: JSON.stringify({
          statusCode: 404, 
          urlName, 
          tabsList: [{
            tabNo: 0,
            tabDetail: ""
          }]
          })
        }
      }
      const {['pswd']:_, ...rest} = result.toObject()
      return { statusCode: 200, body: JSON.stringify({statusCode: 200,...rest}) };
    }
    
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: JSON.stringify({statusCode: 500, ...error}) };
  }
};
