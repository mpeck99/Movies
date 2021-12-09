<template>
  <div class="wrapper">
    <div class="header">
      <v-icon color="#fffcff">mdi-filmstrip</v-icon>
      <h1>Movies</h1>
      <div class="search-form">
        <label for="search" class="sr-only">Search</label>
        <input type="text" name="search" id="search">
        <button class="btn-search">
          <v-icon xlarge color="#fffcff">mdi-magnify</v-icon>
        </button>
      </div>
    </div>
    <div class="movie-wrapper" v-if="movies.length > 0">
      <div class="movie" v-for="movie in movies" :style="{ backgroundImage: 'url(' + movie.poster + ')' }" :key="movie.id" :id="movie.id">
        <div class="content">
          <h2>{{movie.title}}</h2>
          <p>{{movie.overview}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import '@mdi/font/css/materialdesignicons.css'


export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>

<style>
:root {
  /* Colors */
  --black: #333;
  --pink: #f45866;
  --blue: #17bebb;
  --purple: #a882dd;
  --white: #fff;
  /* Fonts */
  --heading: 'Londrina Solid', cursive;
  --body: 'Fresca', sans-serif;
}

html, body {
  color: var(--black);
  font-family: var(--body);

  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--heading);
}
</style>