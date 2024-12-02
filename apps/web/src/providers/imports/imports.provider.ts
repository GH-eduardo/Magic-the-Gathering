import { ImportDeckDto } from "@/services/dto/import-deck.dto";
import { provide, ref } from "vue";
import { ImportDeckKeys } from "./imports.keys";

export function useImportsProvider() {
  const importDeckList = ref<ImportDeckDto[]>([]);
  const importDeckListLoading = ref(false);

  provide(ImportDeckKeys.importDeckList, importDeckList);
  provide(ImportDeckKeys.importDeckListLoading, importDeckListLoading);

  return {
    importDeckList,
    importDeckListLoading
  };
}
