import mongoose, { Model, Schema, model } from 'mongoose';
import { IUser } from '../interface';


const userShema = new Schema({

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: {
      values: ['admin', 'client','super-user', 'SEO'],
      message: '{VALUE} no es un role válido',
      default: 'client',
      required: true
    }
  }
}, {
  timestamps: true,
});

const User: Model<IUser> = mongoose.models.User || model ('User', userShema);

export default User;
