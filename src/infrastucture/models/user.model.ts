import { Schema, model } from 'mongoose';

interface IAccountSchema{
  name: string;
  lastname: string;
  email: string;
  nationality: string;
  age: number;
  civilStatus: string;
  dni: number;
  accountNumber: Number;
  alias: String;
  status: string;
  createdAt: Date;
}

const AccountSchema = new Schema<IAccountSchema>({
  name: { 
    type: String, 
    required: true 
  },
  lastname: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    required: true 
  },
  nationality: {
    type: String,
    default: '',
    required: false
  },
  age: {
    type: Number,
    required: false
  },
  civilStatus: {
    type: String,
    required: true 
  },
  dni: {
    type: Number,
    required: true 
  },
  accountNumber: {
    type: Number,
    required: false,
    unique: true,
  },
  alias: {
    type: String,
    required: false,
    unique: true,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended', 'closed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default model('userAccount', AccountSchema);
