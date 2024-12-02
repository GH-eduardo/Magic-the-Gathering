import { ImportStatusEnum } from "../enums/import-status.enum";

export interface ImportDeckStatus {
    status: ImportStatusEnum;
    generatedAt: Date;
    observation: string;
}