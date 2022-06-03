import mongoose from "mongoose";

const medicineDetailsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tabletsPerStrip: {
      type: Number,
      required: true,
    },
    numberOfStrips: {
      type: Number,
      required: true,
    },
    dosePerDay: {
      type: Number,
      required: true,
    },
    boughtDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.MedicineDetails ||
  mongoose.model("MedicineDetails", medicineDetailsSchema);
