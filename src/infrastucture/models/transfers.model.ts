import { Schema, model } from 'mongoose';

interface ITransferSchema{
  userId: string;
  origin: string;
  destination: string;
  amount: string;
  status: string;
}

const TransferSchema = new Schema<ITransferSchema>({
  userId: { 
    type: String, 
    required: true 
  },
  origin: { 
    type: String, 
    required: true 
  },
  destination: { 
    type: String, 
    required: true 
  },
  amount: {
    type: String,
    required: true 
  },
  status: {
    type: String,
    default: 'success',
    required: false
  },
});


export default model('Transfer', TransferSchema);
