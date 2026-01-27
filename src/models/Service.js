import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    shortDesc: {
      type: String,
      required: [true, "Short description is required"],
      maxlength: [100, "Short description cannot exceed 100 characters"],
    },

    longDesc: {
      type: String,
      required: [true, "Long description is required"],
      minlength: [50, "Long description must be at least 50 characters long"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      index: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  { timestamps: true }
);

export const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);
