import { Schema, Document, model, models } from "mongoose";

export interface ITeam extends Document {
  name: string;
  role: string;
  image: string;
  createdAt: Date;
}

const TeamSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
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

const Team = models.Team || model<ITeam>("Team", TeamSchema);

export default Team;
