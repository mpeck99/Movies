<template>
  <div class="wrapper">
    <div class="header">
      <v-icon color="#fffcff">mdi-filmstrip</v-icon>
      <h1>Peck movies</h1>
      <div class="search-form">
        <label for="search" class="sr-only">Search</label>
        <input type="text" name="search" id="search" />
        <button class="btn-search">
          <v-icon xLarge color="#fffcff">mdi-magnify</v-icon>
        </button>
      </div>
    </div>

    <div class="banner" v-if="this.movies[this.randomNumber]" :style="{backgroundImage: 'url('+this.movies[this.randomNumber].backdrop+')'}">
      <div class="inner">
        <p v-if="this.movies[this.randomNumber].tagline">"{{this.movies[this.randomNumber].tagline}}"</p>
        <h2 class="">{{this.movies[this.randomNumber].title}}</h2>
      </div>
    </div>
    <div class="banner" v-else :style="{       backgroundImage: 'url('+{backgroundImagePath}+')'}">
    </div>  
    <div class="movie-wrapper" v-if="movies.length > 0">
      <div
        class="movie"
        v-for="movie in movies"
        :style="{ backgroundImage: 'url(' + movie.poster + ')' }"
        :key="movie.id"
        :id="movie.id"
      >
        <div class="content">
          <h2>{{ movie.title }}</h2>

          <time>{{ movie.year }}</time>
          <p v-if="movie.overview.length > 200">
            {{ movie.overview.substring(0, 200) }}
            <a
              :href="`https://www.themoviedb.org/movie/${movie.id}-${movie.title}`"
              target="_blank"
              class="read-more"
              aria-label="Read more about'+movieSearch.data.results[0].title+'"
              >...read more</a
            >
          </p>
          <p v-else>{{ movie.overview }}</p>
          <ul class="info">
            <li class="trailer" v-if="movie.videoKey">
              <a
              :href="`https://www.youtube.com/watch?v=${movie.videoKey}`"
              v-if="movie.videoKey"
              :title="`${movie.title} Trailer`"
              target="_blank"
              ><v-icon>mdi-play</v-icon><span class="sr-only">Watch {{movie.title}} trailer</span></a
            >
            </li>
            <li><a :href="`https://www.themoviedb.org/movie/${movie.id}-${movie.title}`"
              target="_blank"
              class="read-more"
              aria-label="Read more about'+movieSearch.data.results[0].title+'">Learn more <span class="sr-only">about {{movie.title}}</span></a></li>
            <li class="rating">
              <v-progress-circular :value="movie.rating" :width="3" :size="42" :rotate="280" color="#41d3bd">{{movie.rating}}%</v-progress-circular>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import "@mdi/font/css/materialdesignicons.css";
const apiKey = process.env.API_Key
const axios = require("axios");
const url =
  "https://sheets.googleapis.com/v4/spreadsheets/1nXRZYrOnedMOvioQJxbIQKTpc9_XCGI23-KMk8jwZQU/values/Movies!A:D?key=AIzaSyDrWhgTrY_NIQ7pa19SpdYtF0Wcom3stDA";

export default {
  components: {
    Logo,
    VuetifyLogo,
  },

  data() {
    return {
      personalMovies: [],
      movies: [],
      key: "",
      apiKey: process.env.API_Key,
      randomMovie: [],
      randomNumber: 0
    };
  },
  async created() {
    try{
      const res =  await axios.get(url);
      const rows = res.data.values;
      const searchAPI =
        "https://api.themoviedb.org/3/search/movie?api_key=e444034c3d7ef62e63059e6e8ac5b828&query=";
    
      this.randomNumber = Math.floor(Math.random()*rows.length/ 40)+1
      setTimeout(() => {
        setInterval(() => {
        this.randomNumber = Math.floor(Math.random()*rows.length)+1
      }, 15000);
      }, 15000);
      
      for (const i in rows) {
        const movieSearch = await axios.get(
          searchAPI +
            rows[i][0] +
            "&primary_release_year=" +
            rows[i][1] +
            "&page=1&language=en-US"
        );
        const date = new Date(movieSearch.data.results[0].release_date);
        const videoKey = await axios.get(
          "https://api.themoviedb.org/3/movie/" +
            movieSearch.data.results[0].id +
            "/videos?api_key=e444034c3d7ef62e63059e6e8ac5b828&language=en-US"
        );

        for (const x in videoKey) {
          if (videoKey[x].results != undefined) {
            if (videoKey[x].results.length > 0) {
              for (const y in videoKey[x].results) {
                if (
                  videoKey[x].results[y].type &&
                  videoKey[x].results[y].type === "Trailer"
                ) {
                  this.key = videoKey[x].results[y].key;
                }
              }
            } else {
              this.key = "";
            }
          }
        }

        const options = { year: "numeric", month: "short", day: "numeric" };
        setTimeout(() => {
        this.movies.push({
          id: movieSearch.data.results[0].id,
          title: movieSearch.data.results[0].title,
          year: date.toLocaleDateString("en-US", options),
          overview: movieSearch.data.results[0].overview,
          poster:
            "https://image.tmdb.org/t/p/original/" +
            movieSearch.data.results[0].poster_path,
          backdrop:
            "https://image.tmdb.org/t/p/original/" +
            movieSearch.data.results[0].backdrop_path,
          rating: Math.round(movieSearch.data.results[0].vote_average * 10),
          videoKey: this.key,
        });
      }, 100);
        
      }  
    }
    catch(err){
      console.log(err);
    }
  },
};
</script>

<style>
:root {
  /* Colors */
  --black: #141414;
  --tealD: #061c23;
  --teal: #065a60;
  --pink: #ff6b6b;
  --turquoise: #41d3bd;
  --yellow: #f7e733;
  --white: #fffcff;
  --maroon: #603140;
  /* Fonts */
  --heading: "Staatliches", cursive;
  --body: "Raleway", sans-serif;
}

html,
body {
  padding: 1rem;

  position: relative;

  color: var(--white);
  font-family: var(--body);
  font-size: 16px;

  box-sizing: border-box;
  background: linear-gradient(
    to left,
    var(--tealD),
    var(--teal),
    var(--teal),
    var(--tealD)
  );

  line-height: 1.5;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--heading);
}

h1 {
  font-size: 3rem;
  font-weight: 500;
}

h2 {
  font-size: 1.6rem;
}

time {
  font-family: var(--heading);
  font-size: 1rem;
}

a {
  color: var(--white);
  font-weight: 700;
}

a:hover,
a:focus {
  color: var(--pink);
}

.header {
  width: 100%;
  height: 5rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;

  padding: 1rem 2.5rem;

  background: var(--tealD);
  border-bottom: 2px solid var(--pink);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  z-index: 10;
}

.banner {
  height: calc(100vh - 3rem);
  width: 100vw;

  margin-top: 3rem;
  margin-left: -2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  background-size: cover;

}

.banner:before {
  content: '';
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background: linear-gradient(30deg, rgba(255,107, 107, 0.8),rgba(6, 90, 96, 0.9));
  filter: contrast(-2%);
  z-index: 1;
}

.banner h2 {
  font-size: 4rem;
  font-family: var(--body);
  font-weight: 400;
  z-index: 2;

  filter:blur(0)
}

.movie-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  padding: 0;
  margin-top: 2rem;
}

.movie {
  width: 16rem;
  height: 25.5rem;

  margin: 0.5rem;

  background-size: 100% 100%;
  background-position: center;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);

  animation: slideIn 2s forwards ease-in;
  transform: scale(1.1);
}

.movie:hover .content {
  display: block;
}

.movie .content {
  height: 100%;

  display: none;
  position: relative;

  padding: 1rem;

  background: rgba(55,55,55, 0.7);
}

.search-form {
  display: flex;
  margin-left: auto;
}

.btn-search {
  width: 3rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: var(--teal);
  border-radius: 50%;
}

.v-icon {
  font-size: 2.5rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.info {
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  padding: 0.5rem;

  position: absolute;
  bottom: 0.25rem;
  left: 0;

  list-style: none;
}

.info li a {
  display: flex;
  text-decoration: none;

}

.rating {
  width: 2.5rem;
  height: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  background: var(--tealD);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);

  font-size: 1.5rem;
  font-weight: 700;
}

.v-progress-circular__info {
  font-size: 0.75rem;
  color: var(--white);
}

.trailer {
  width: 2.5rem;
  height: 2.4rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--turquoise);
  border-radius: 50%;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.trailer:hover .mdi-play {
  color: var(--turquoise) !important;
}

.trailer:hover, .trailer:focus {
  background-color: var(--tealD);
  border: 0.1rem solid var(--pink);
}

.mdi-play {
  font-size: 1.9rem;
  color: var(--tealD) !important;
}

@keyframes slideIn {
  0% {
    transition: all;
    transform: translateX(-50rem);
    opacity: 0;
  }

  100% {
    transition: all;
    opacity: 1;
    transform: translateX(0);
  }
}
</style>