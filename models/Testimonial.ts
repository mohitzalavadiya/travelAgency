import { Schema, Document, model, models } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role: string;
  content: string;
  image: string;
  createdAt: Date;
}

const TestimonialSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
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

const Testimonial = models.Testimonial || model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
