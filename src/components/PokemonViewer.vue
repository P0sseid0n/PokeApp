<script setup lang="ts">
import { ref, type Ref, onUpdated } from 'vue'
import { getPokemonSpriteUrl, getTypeColor, translateTypeName } from '@/PokemonUtils';
import { usePokemonStore } from '@/stores'
const pokemonStore = usePokemonStore()

const imageSelected: Ref<1 | 2 | 3 | 4> = ref(1)

</script>

<template>
   <div id="pokemonViewer" v-if="pokemonStore.selected">
      <img
         v-if="getPokemonSpriteUrl(pokemonStore.selected.sprites)"
         :src="getPokemonSpriteUrl(pokemonStore.selected.sprites, imageSelected)!"
         alt="Imagem"
         @click="imageSelected >= 4 ? imageSelected = 1 : imageSelected++"
      />
      <header>
         <p>{{ pokemonStore.selected.id.toString().padStart(3, '0') }}</p>
         <h2>{{ pokemonStore.selected.name }}</h2>
      </header>
      <div id="types">
         <span
            v-for="({ type }) in pokemonStore.selected.types"
            :style="getTypeColor(type.name)"
         >{{ translateTypeName(type.name) }}</span>
      </div>
      <div id="infos">
         <div>
            <p>Altura</p>
            <h3>{{ (pokemonStore.selected.height / 10).toFixed(1) }} m</h3>
         </div>
         <div>
            <p>Peso</p>
            <h3>{{ (pokemonStore.selected.weight / 10).toFixed(1) }} kg</h3>
         </div>
      </div>
   </div>
   <div id="pokemonViewer"></div>
</template>


<style scoped lang="scss">
#pokemonViewer {
   display: flex;
   flex-direction: column;
   align-items: center;
   flex: auto;
   padding-top: 16px;
}
img {
   width: 150px;
   height: 150px;
   cursor: pointer;
   background: #fff;
   border-radius: 100%;
}

header {
   p {
      font-size: 18px;
      opacity: 0.5;
      font-weight: 500;
   }

   h2 {
      text-transform: capitalize;
      font-size: 32px;
      font-weight: 500;
   }
}

#types span {
   text-transform: capitalize;
   padding: 4px 8px;
   border-radius: 8px;
   margin-right: 8px;
}

#infos {
   display: flex;
   flex-direction: row;
   gap: 16px;

   margin-top: 16px;

   p {
      font-size: 16px;
      opacity: 0.5;
      font-weight: 500;
   }

   h3 {
      font-size: 20px;
      font-weight: 600;
      opacity: 0.75;
   }
}
</style>