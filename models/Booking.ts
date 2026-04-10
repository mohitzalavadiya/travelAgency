import { Schema, Document, model, models } from "mongoose";

export interface IBooking extends Document {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: Date;
  people: string;
  message?: string;
  createdAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    destination: {
      type: String,
      required: [true, "Destination is required"],
    },
    travelDate: {
      type: Date,
      required: [true, "Travel date is required"],
    },
    people: {
      type: String,
      required: [true, "Number of people is required"],
    },
    message: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
