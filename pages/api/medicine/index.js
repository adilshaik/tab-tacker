import { getSession } from "next-auth/react";
import MedicineDetails from "../../../models/MedicineDetails";
import connectDB from "../../../src/lib/connectDB";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await createMedicine(req, res);
      break;
    case "GET":
      await getMedicines(req, res);
      break;
  }
}

const createMedicine = async (req, res) => {
  try {
    await connectDB();

    const { userId, name, tabletsPerStrip, numberOfStrips, dosePerDay, boughtDate } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "Invalid Authentication!" });
    }

    const newMedicine = new MedicineDetails({
      user: userId,
      name,
      tabletsPerStrip,
      dosePerDay,
      numberOfStrips,
      boughtDate,
    });

    await newMedicine.save();

    res.json({ message: "Medicine is added.", newMedicine });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMedicines = async (req, res) => {
  try {
    await connectDB();

    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ msg: "Invalid Authentication!" });
    }

    const medicines = await MedicineDetails.find({ user: userId });
    res.json(medicines);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
