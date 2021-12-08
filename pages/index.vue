<template>
  <h1>Movies</h1>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

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