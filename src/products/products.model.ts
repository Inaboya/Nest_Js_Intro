/* eslint-disable prettier/prettier */
import { Schema, Document } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

export interface Products extends Document {
  id: string;
  name: string;
  price: number;
  description: string;
}
