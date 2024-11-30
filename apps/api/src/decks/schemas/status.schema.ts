import { ImportationStatus } from 'src/decks/enums/importation-status.enum'; 

export interface Status {
    status: ImportationStatus;
    generatedAt: Date;
    observation: string;
}