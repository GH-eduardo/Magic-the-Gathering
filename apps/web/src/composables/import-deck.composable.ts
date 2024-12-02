import ImportDeckService from "@/services/api/imports.service"; 
import { ImportDeckDto } from "@/services/dto/import-deck.dto";
import { Ref } from "vue";

export function useImportDeck() {
    const createImportDeck = async (body: ImportDeckDto, loading: Ref<boolean>) => {
        loading.value = true;

        const response = await ImportDeckService.postImportDeck(body);

        loading.value = false;

        return response.data ?? null;
    }

    const fetchImportDecks = async (importDeckList: Ref<ImportDeckDto[]>, loading: Ref<boolean>) => {
        loading.value = true;

        const response = await ImportDeckService.getImportDecks();

        loading.value = false;

        importDeckList.value = response.data?.data ?? [];
    }

    const fetchImportDeckById = async (importDeckId: string, importDeck: Ref<ImportDeckDto>, loading: Ref<boolean>) => {
        loading.value = true;

        const response = await ImportDeckService.getImportDeckById(importDeckId);

        loading.value = false;
        
        importDeck.value = response.data?.data ?? {} as ImportDeckDto;
    }
    
    return {
        createImportDeck,
        fetchImportDecks,
        fetchImportDeckById
    };
}