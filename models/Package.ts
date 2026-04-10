import { Schema, Document, model, models } from "mongoose";

export interface IPackage extends Document {
  name: string;
  price: number;
  duration: string;
  location: string;
  rating: number;
  image: string;
  includes: string[];
  description: string;
  isFeatured: boolean;
  createdAt: Date;
}

const PackageSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    includes: {
      type: [String],
      required: true,
      default: [],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Package = models.Package || model<IPackage>("Package", PackageSchema);

export default Package;
