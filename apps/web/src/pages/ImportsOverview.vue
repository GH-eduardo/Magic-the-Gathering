<template>
    <v-table density="compact">
        <thead>
            <tr>
                <th class="text-left">
                    Name
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in importDeckList" :key="item.name">
                <td>{{ item.name }}</td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup lang="ts">
import { useImportDeck } from '@/composables/import-deck.composable';
import { useImportsProvider } from '@/providers/imports/imports.provider';
import { onMounted } from 'vue';

const { importDeckList, importDeckListLoading } = useImportsProvider();
const { fetchImportDecks } = useImportDeck();

onMounted(async () => {
    fetchImportDecks(
        importDeckList,
        importDeckListLoading
    );
});
</script>