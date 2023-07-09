import mongoose, { Document, Schema } from 'mongoose';

interface IVaultSafe extends Document {
  urlName: string;
  pswd: string;
  tabsList: {
    tabNo: number;
    tabDetail: string;
  }[];
}

const VaultSafeSchema: Schema = new Schema({
  urlName: { type: String, required: true },
  pswd: { type: String, required: true },
  tabsList: [
    {
      tabNo: { type: Number },
      tabDetail: { type: String }
    }
  ]
});
const VaultSafeModel = mongoose.model<IVaultSafe>('VaultSafe', VaultSafeSchema);

export default VaultSafeModel;
