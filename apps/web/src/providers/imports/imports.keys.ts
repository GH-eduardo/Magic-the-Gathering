import { ImportDeckDto } from "@/services/dto/import-deck.dto";
import type { InjectionKey, Ref } from "vue";

export const ImportDeckKeys: {
    importDeckList: InjectionKey<Ref<ImportDeckDto[]>>,
    importDeckListLoading: InjectionKey<Ref<boolean>>,
    importDeckListActive: InjectionKey<Ref<boolean>>,
} = {
    importDeckList: Symbol('importDeckList'),
    importDeckListLoading: Symbol('importDeckListLoading'),
    importDeckListActive: Symbol('importDeckListActive'),
};