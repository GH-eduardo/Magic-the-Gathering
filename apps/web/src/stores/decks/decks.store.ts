import { defineStore } from 'pinia'
import { DeckDetails } from './dto/deck-details.dto'
import { DeckOverview } from './dto/deck-overview.dto'
import { useUsersStore } from '../users/user.store'
import { DeckExportDto } from './dto/deck-export.dto'
import { EditDeckDto } from './dto/deck-edit.dto'

export const useDecksStore = defineStore('decks', () => {
    const userStore = useUsersStore();

    async function getDecksOverviewAsync(): Promise<DeckOverview[]> {
        const response = await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/decks`, {
            headers: {
                "Authorization": "Bearer " + userStore.accessToken.token
            }
        });
        return await response.json();
    }

    async function getDeckDetailsAsync(id: string): Promise<DeckDetails | null> {
        const response = await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/decks/${id}`, {
            headers: {
                "Authorization": "Bearer " + userStore.accessToken.token
            }
        });
        return await response.json();
    }

    async function deleteDeckAsync(id: string): Promise<void> {
        await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/decks/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + userStore.accessToken.token
            }
        });
    }

    async function exportDeckAsync(id: string): Promise<DeckExportDto> {
        const response = await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/decks/${id}/export`, {
            headers: {
                "Authorization": "Bearer " + userStore.accessToken.token
            }
        })
        return await response.json();
    }

    async function editDeckAsync(id: string, data: EditDeckDto): Promise<void> {
        console.log(JSON.stringify(data))
        await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/decks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userStore.accessToken.token
            },
            body: JSON.stringify(data)
        })
    }

    async function importDeckAsync(data: DeckExportDto) {
        console.log(data)
        await fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/decks/import`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userStore.accessToken.token
            },
            body: JSON.stringify(data)
        })
    }
    return { getDeckDetailsAsync, getDecksOverviewAsync, deleteDeckAsync, exportDeckAsync, importDeckAsync, editDeckAsync }
})
