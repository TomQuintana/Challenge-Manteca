import { Schema, model } from 'mongoose';

interface IAccountSchema{
  userId: string;
  name: string;
  email: string;
  dni: number;
  cbu: string;
  alias: String;
  balance_usd: Number;
  balance_ars: Number;
}

const AccountSchema = new Schema<IAccountSchema>({
  userId: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    required: true 
  },
  dni: {
    type: Number,
    required: true 
  },
  cbu: {
    type: String,
    required: false,
    unique: true,
  },
  alias: {
    type: String,
    required: false,
    unique: true,
  },
  balance_usd: {
    type: Number,
    required: true, 
    default: 1000,
  },
balance_ars: {
    type: Number,
    required: true, 
    default: 1000,
  }
});

export default model('userAccount', AccountSchema);
