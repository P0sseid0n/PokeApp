<script setup lang="ts">
import { usePokemonStore } from '@/stores'
import { getPokemonSpriteUrl, getTypeColor, translateTypeName } from '@/PokemonUtils'

const pokemonStore = usePokemonStore()

function scrolado(payload: UIEvent) {
   const target = payload.target as HTMLDListElement


   if (target.scrollLeft <= 0) {
      // console.log('É O INICIO')
   }

   if (target.scrollLeft + target.clientWidth >= target.scrollWidth) {
      pokemonStore.fetchList()
      // console.log('É O FIM')

   }
}

function scrollList(payload: WheelEvent) {
   const path = payload.composedPath() as HTMLElement[]
   const target = path.find(el => el.id === 'PokemonList') as HTMLDivElement

   if (payload.deltaY > 0) target.scrollLeft += 100
   else target.scrollLeft -= 100
}

</script>

<template>
   <div id="PokemonList" @scroll="scrolado" @wheel="scrollList">
      <ul>
         <li
            v-if="pokemonStore.list.length"
            v-for="pokemon in pokemonStore.list"
            :class="{ 'selected': pokemon.id == pokemonStore.selectedId }"
            @click="pokemonStore.selectedId = pokemon.id"
         >
            <p>{{ pokemon.id.toString().padStart(3, '0') }}</p>

            <img
               v-if="getPokemonSpriteUrl(pokemon.sprites)"
               :src="getPokemonSpriteUrl(pokemon.sprites, 1)!"
               alt="Imagem"
            />
            <div>
               <h4>{{ pokemon.name }}</h4>
               <span
                  v-for="({ type }) in pokemon.types"
                  :style="getTypeColor(type.name)"
               >{{ translateTypeName(type.name) }}</span>
            </div>
         </li>
         <li class="loading" v-if="pokemonStore.fetching">
            <img src="@/assets/LoadingDual.svg" alt="Laoding" />
            <p>Carregando...</p>
         </li>
      </ul>
   </div>
</template>



<style scoped lang="scss">
#PokemonList {
   background-color: rgb(255, 255, 255);
   border-radius: 0 0 16px 16px;
   width: 100%;
   height: 200px;

   overflow: hidden;
   transform: rotateX(180deg);
   -ms-transform: rotateX(180deg);
   -webkit-transform: rotateX(180deg);

   padding-bottom: 17px;

   text-align: center;

   scrollbar-width: auto;
   scrollbar-color: #c3c3c3 #ffffff;

   transition: overflow 1s;

   &:hover {
      overflow-x: scroll;
      padding-bottom: 0;
   }

   &::-webkit-scrollbar {
      width: 16px;
   }

   &::-webkit-scrollbar-track {
      background: #ffffff;
   }

   &::-webkit-scrollbar-thumb {
      background-color: #c3c3c3;
      border-radius: 6px;
      border: 3px solid #ffffff;
   }

   ul {
      display: flex;
      flex-direction: row;
      height: 100%;
      gap: 16px;
   }

   li {
      padding: 0 16px;
      height: 100%;
      border: none;
      background: none;
      margin-bottom: 8px;
      cursor: pointer;

      transform: rotateX(180deg);
      -ms-transform: rotateX(180deg);
      -webkit-transform: rotateX(180deg);

      display: flex;
      flex-direction: column;
      align-items: center;

      transition: padding 0.1s ease-in-out;

      &:hover {
         // background: rgba(0, 0, 0, 0.045);
         padding-bottom: 48px;
      }

      &.selected {
         border-bottom: 6px solid var(--red-base);
      }

      &.loading {
         align-items: center;
         justify-content: center;
      }

      p {
         font-size: 16px;
         opacity: 0.3;
         font-weight: 500;
      }

      span {
         padding: 0px 8px;
         margin-right: 8px;
         font-size: 15px;

         border-radius: 4px;

         background-color: rgba(0, 0, 255, 0.1);
         color: blue;
      }

      > *:not(img) {
         padding-bottom: 16px;
      }
   }

   h3 {
      margin-bottom: 16px;
      letter-spacing: 2px;
   }

   img {
      width: 64px;
      margin: 0 16px;
   }

   h4 {
      text-transform: capitalize;
      font-weight: 400;
      font-size: 20px;
   }
}

@media screen and (max-width: 768px) {
   #PokemonList {
      overflow-x: scroll;
   }
}
</style>