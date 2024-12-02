import { ImportationStatus } from './../enums/importation-status.enum'; 

export interface Status {
    status: ImportationStatus;
    generatedAt: Date;
    observation: string;
}
