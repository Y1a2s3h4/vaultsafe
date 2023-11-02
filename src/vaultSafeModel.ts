import mongoose, { Document, Schema } from 'mongoose';

interface IVaultSafe extends Document {
  urlName: string;
  pswd: string;
  tabsList: string
  // tabsList: {
  //   tabNo: number;
  //   tabDetail: string;
  // }[];
}

const VaultSafeSchema: Schema = new Schema({
  urlName: { type: String, required: true, },
  pswd: { type: String },
  tabsList: String,
  // tabsList: [
  //   {
  //     tabNo: { type: Number },
  //     tabDetail: { type: String }
  //   }
  // ]
});
const VaultSafeModel = mongoose.models.VaultSafe || mongoose.model<IVaultSafe>('VaultSafe', VaultSafeSchema);

export default VaultSafeModel;