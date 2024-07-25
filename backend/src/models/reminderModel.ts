import mongoose, { Schema, Document } from "mongoose";

export interface IReminder extends Document {
  label: string;
  value: number;
  transactionType: "income" | "expense";
  isImportant: boolean;
  deadlineDay: string;
  description?: string;
  bank?: string;
  forWho?: string;
}

const ReminderSchema: Schema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    transactionType: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    isImportant: { type: Boolean, required: true },
    deadlineDay: { type: String, required: false },
    description: { type: String },
    bank: { type: String, required: false },
    forWho: { type: String, required: false },
  },
  { timestamps: true }
);

export const ReminderModel = mongoose.model<IReminder>(
  "Reminder",
  ReminderSchema
);
