import { Schema, Document, model, models } from "mongoose";

export interface IOffer extends Document {
  title: string;
  subtitle: string;
  discount: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  isActive: boolean;
  createdAt: Date;
}

const OfferSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    subtitle: {
      type: String,
      required: [true, "Subtitle is required"],
    },
    discount: {
      type: String,
      required: [true, "Discount is required"],
    },
    ctaText: {
      type: String,
      default: "Get Started",
    },
    ctaLink: {
      type: String,
      default: "/booking",
    },
    backgroundImage: {
      type: String,
      required: [true, "Background image URL is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Offer = models.Offer || model<IOffer>("Offer", OfferSchema);

export default Offer;
