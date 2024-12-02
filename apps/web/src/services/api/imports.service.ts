import { AxiosInstance } from "axios";
import apiServiceInstance from "./api-service-instance";
import { ImportDeckDto } from "../dto/import-deck.dto";
import IDefaultResponse from "../dto/default-response";
import handleAxiosError from "@/utils/axios-error.helper";

class ImportDecksService {
    private $http: AxiosInstance;

    constructor() {
        this.$http = apiServiceInstance();
    }

    public async postImportDeck(body: ImportDeckDto): Promise<IDefaultResponse<{ deckId: string }>> {
        try {
            const response = await this.$http.post('import', body);
            return { data: response.data };
        } catch (exception) {
            const error = handleAxiosError(exception);
            return { error };
        }
    }

    public async getImportDecks(): Promise<IDefaultResponse<IDefaultResponse<ImportDeckDto[]>>> {
        try {
            const response = await this.$http.get('import');
            return { data: response.data };
        } catch (exception) {
            const error = handleAxiosError(exception);
            return { error };
        }
    }

    public async getImportDeckById(importDeckId: string): Promise<IDefaultResponse<IDefaultResponse<ImportDeckDto>>> {
        try {
            const response = await this.$http.get(`import/${importDeckId}`);
            return { data: response.data };
        } catch (exception) {
            const error = handleAxiosError(exception);
            return { error };
        }
    }
}

export default new ImportDecksService();
