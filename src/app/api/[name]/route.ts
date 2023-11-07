import VaultSafeModel from "../../../vaultSafeModel";
import mongoose, { ConnectOptions } from "mongoose";
export async function GET(req: Request, context: { params: { name: string } }) {
  const urlName = context.params.name;
  const MongoUri: string = process.env.MONGO_URI || "";
  mongoose
    .connect(MongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
  if (!urlName) {
    return new Response(JSON.stringify({ statusCode: 404, error: "urlName not provided!" }), {
      status: 404,
    });
  } else {
    const result = await VaultSafeModel.findOne({ urlName });
    if (!result) {
      return new Response(
        JSON.stringify({
          statusCode: 404,
          urlName,
          tabsList: [
            {
              tabNo: 1,
              tabDetail: "",
            },
          ],
        }),
        { status: 404 }
      );
    }
    // const { ["pswd"]: _, ...rest } = result.toObject();
    return new Response(JSON.stringify({ statusCode: 200, ...result.toObject() }), {
      status: 200,
    });
  }
}

export async function POST(req: Request) {
try {
  const MongoUri: string = process.env.MONGO_URI || '';
    mongoose
      .connect(MongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.log(err)); 
  const { urlName, pswd, tabsList } = await req.json();
  const vaultSafeObject = await VaultSafeModel.create({
    urlName,
    pswd,
    tabsList
  });
  vaultSafeObject.save();
  const {['pswd']:_, ...rest} = vaultSafeObject.toObject()

  return new Response(JSON.stringify({ statusCode: 200, ...rest}),{status:200});
  
} catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ statusCode: 500, error}), {status:500});
}
}
export async function PATCH(req: Request){
  try {
    const MongoUri: string = process.env.MONGO_URI || '';
    mongoose
      .connect(MongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.log(err));
    const { tabsList, _id } = await req.json();
    const r = await VaultSafeModel.updateOne(
        { _id },
        { $set: { tabsList } }
      );
    const result = await VaultSafeModel.findOne({_id}, {'_id':1,'urlName':1, 'tabsList':1, '__v':1})
      
      return new Response(JSON.stringify({statusCode: 200, ...result.toObject()}), {status: 200})
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ statusCode: 500, error}), {status:500});
  }
}