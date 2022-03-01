import { PokemonClient, type PokemonSprites } from 'pokenode-ts'

export async function getPokemonList(offset = 0, limit = 25) {
	const api = new PokemonClient()

	const list = (await api.listPokemons(offset, limit)).results as { name: string; url: string }[]

	return await Promise.all(list.map(pokemon => api.getPokemonByName(pokemon.name)))
}

export function getPokemonSpriteUrl(sprites: PokemonSprites, position?: 1 | 2 | 3 | 4) {
	const images = {
		1: sprites.other.home.front_default,
		2: sprites.other['official-artwork'].front_default,
		3: sprites.other.dream_world.front_default,
		4: sprites.front_default,
	}

	return images[position || 1 || 2 || 3 || 4]
}

function hexToRgb(hex: string) {
	const r = parseInt(hex.slice(1, 3), 16)
	const g = parseInt(hex.slice(3, 5), 16)
	const b = parseInt(hex.slice(5, 7), 16)
	return r + ',' + g + ',' + b
}

export function getTypeColor(type: string) {
	let color

	if (type === 'normal') color = '#ACA974'
	else if (type === 'fighting') color = '#E81319'
	else if (type === 'flying') color = '#5EB9B2'
	else if (type === 'poison') color = '#A819D7'
	else if (type === 'ground') color = '#BFAC21'
	else if (type === 'rock') color = '#776A3E'
	else if (type === 'bug') color = '#91BA2E'
	else if (type === 'ghost') color = '#705898'
	else if (type === 'steel') color = '#B8B8D0'
	else if (type === 'fire') color = '#F67F0B'
	else if (type === 'water') color = '#0A7ABC'
	else if (type === 'grass') color = '#3E9709'
	else if (type === 'electric') color = '#E6BE14'
	else if (type === 'psychic') color = '#F85888'
	else if (type === 'ice') color = '#98D8D8'
	else if (type === 'dragon') color = '#7038F8'
	else if (type === 'dark') color = '#705848'
	else if (type === 'fairy') color = '#F87EA7'
	else color = '#000000'

	return {
		color,
		backgroundColor: 'rgba(' + hexToRgb(color) + ', 0.15)',
	}
}

export function translateTypeName(type: string) {
	type = type.toLowerCase()

	if (type === 'normal') return 'normal'
	else if (type === 'fighting') return 'lutador'
	else if (type === 'flying') return 'voador'
	else if (type === 'poison') return 'veneno'
	else if (type === 'ground') return 'terra'
	else if (type === 'rock') return 'pedra'
	else if (type === 'bug') return 'inseto'
	else if (type === 'ghost') return 'fantasma'
	else if (type === 'steel') return 'ferro'
	else if (type === 'fire') return 'fogo'
	else if (type === 'water') return 'água'
	else if (type === 'grass') return 'grama'
	else if (type === 'electric') return 'elétrico'
	else if (type === 'psychic') return 'psíquico'
	else if (type === 'ice') return 'gelo'
	else if (type === 'dragon') return 'dragão'
	else if (type === 'dark') return 'sombrio'
	else if (type === 'fairy') return 'fada'
}
