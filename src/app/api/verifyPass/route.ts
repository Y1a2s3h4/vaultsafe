import VaultSafeModel from "../../../vaultSafeModel";
import mongoose, { ConnectOptions } from "mongoose";
export async function POST(req: Request) {
  try {
    const { urlName, pswd } = await req.json();
    const MongoUri: string = process.env.MONGO_URI || "";

    mongoose
      .connect(MongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.log(err));

    const vaultSafeResult = await VaultSafeModel.findOne({ urlName });
    if (vaultSafeResult?.pswd === pswd) {
      const { ["pswd"]: _, ...rest } = vaultSafeResult.toObject();

      return new Response(JSON.stringify({ statusCode: 200, ...rest }), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({
          statusCode: 401,
          urlName,
          tabsList: [
            {
              tabNo: 0,
              tabDetail: "",
            },
          ],
          message: "Incorrect Password.",
        }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ statusCode: 500, error }), {
      status: 500,
    });
  }
}
