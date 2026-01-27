import mongoose from "mongoose";
import slugify from "slugify";

const scholarshipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    image: {
      type: String,
      required: [true, "Image is required"],
    },

    degrees: {
      type: [String],
      required: [true, "Degrees are required"],
    },

    location: {
      type: String,
      required: [true, "Location is required"],
    },

    benefits: {
      type: String,
      required: [true, "Benefits are required"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    applyUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

scholarshipSchema.pre("save", function () {
  if (!this.isModified("name")) return;

  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
});

export const Scholarship =
  mongoose.models.Scholarship ||
  mongoose.model("Scholarship", scholarshipSchema);
