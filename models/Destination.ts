import { Schema, Document, model, models } from "mongoose";

export interface IDestination extends Document {
  name: string;
  country: string;
  description: string;
  longDescription: string;
  rating: number;
  image: string;
  createdAt: Date;
}

const DestinationSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    longDescription: {
      type: String,
      required: [true, "Long description is required"],
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Destination = models.Destination || model<IDestination>("Destination", DestinationSchema);

export default Destination;
