import mongoose from "mongoose";
import { unstable_cache } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Workshop from "@/models/Workshop";

export interface WorkshopItem {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

function toWorkshopItem(doc: { _id: mongoose.Types.ObjectId; name: string; description: string; imageUrl: string; createdAt: Date; updatedAt: Date }) {
  return {
    ...doc,
    _id: String(doc._id),
  };
}

async function getWorkshopsUncached(): Promise<WorkshopItem[]> {
  await dbConnect();
  const items = await Workshop.find({}).sort({ createdAt: -1 }).lean();
  return items.map((it) => toWorkshopItem(it as Parameters<typeof toWorkshopItem>[0]));
}

async function getWorkshopByIdUncached(id: string): Promise<WorkshopItem | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  await dbConnect();
  const doc = await Workshop.findById(id).lean();
  if (!doc) return null;
  return toWorkshopItem(doc as Parameters<typeof toWorkshopItem>[0]);
}

export const getWorkshops = unstable_cache(
  getWorkshopsUncached,
  ["workshops-list"],
  { revalidate: 60 }
);

export function getWorkshopById(id: string): Promise<WorkshopItem | null> {
  return unstable_cache(
    () => getWorkshopByIdUncached(id),
    ["workshop", id],
    { revalidate: 60 }
  )();
}
