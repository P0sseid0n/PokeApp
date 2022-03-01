import { defineStore } from 'pinia'
import type { Pokemon } from 'pokenode-ts'
import { getPokemonList } from '@/PokemonUtils'

export const usePokemonStore = defineStore({
	id: 'pokemon',
	state: () => ({
		list: [] as Pick<Pokemon, 'name' | 'id' | 'types' | 'sprites' | 'weight' | 'height'>[],
		selectedId: 1,
		fetching: false,
	}),
	actions: {
		async fetchList() {
			if (this.fetching) return

			const limitToFetch = 25

			this.fetching = true
			const pokemonList = await getPokemonList(this.list.length, limitToFetch)

			this.fetching = false

			this.list.push(
				...pokemonList.map(({ name, id, types, sprites, weight, height }) => ({
					name,
					id,
					types,
					sprites,
					weight,
					height,
				}))
			)
		},
	},

	getters: {
		selected: state => state.list.find(pokemon => pokemon.id === state.selectedId),
	},
})
