import { Schema, model } from 'mongoose';

interface IUserSchema{
  name: string;
  lastname: string;
  password: string;
  email: string;
  nationality: string;
  age: number;
  civilStatus: string;
  dni: number;
  status: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUserSchema>({
  name: { 
    type: String, 
    required: true 
  },
  lastname: { 
    type: String, 
    required: true 
  },
  password: { 
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

export default model('user', UserSchema);
