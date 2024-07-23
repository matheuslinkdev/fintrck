import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  label: string;
  value: number;
  transactionType: "income" | "expense";
  isImportant: boolean;
  date: string;
  description?: string;
  bank?: string;
  recurring: boolean;
}

const TransactionSchema: Schema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    transactionType: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    isImportant: { type: Boolean, required: true },
    date: { type: String, required: true },
    description: { type: String },
    bank: { type: String },
    recurring: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const TransactionModel = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
