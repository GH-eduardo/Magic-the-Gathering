import mongoose from "mongoose";

export interface CreateDeckDto {
    name: string;
    description: string;
    commanderName: string;
    ownerId: mongoose.Types.ObjectId;
}
