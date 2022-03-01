<script setup lang="ts">
import { usePokemonStore } from './stores'
import PokemonList from './components/PokemonList.vue'
import PokemonViewer from './components/PokemonViewer.vue'

const pokemonStore = usePokemonStore()

pokemonStore.fetchList()

</script>

<template>
   <header>
      <h1>PokeApp</h1>
      <p>
         Feito por
         <a
            href="http://p0sseid0n.site"
            target="_blank"
            rel="noopener noreferrer"
         >P0sseid0n</a>
      </p>
   </header>
   <PokemonViewer />
   <PokemonList />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap");
@import "./assets/base.css";

* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   font-family: "Fredoka", sans-serif;
}

#app {
   height: 100vh;
   width: 100%;
   background-color: rgb(246, 246, 246);
   display: flex;
   flex-direction: column;
}

header {
   width: 100%;
   height: 96px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   h1 {
      font-weight: 600;
      letter-spacing: 1px;
      font-size: 48px;
      color: var(--red-base);
   }

   p {
      font-size: 18px;
   }

   a {
      color: rgb(125, 125, 125);
      text-decoration: none;
   }
}

main {
   display: flex;
   flex-direction: row;
   height: calc(100% - 96px);
}
</style>
