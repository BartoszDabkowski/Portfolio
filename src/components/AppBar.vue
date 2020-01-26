<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>
      <router-link to="/pathfinder">
        <v-btn icon>
          <v-icon>mdi-graph-outline</v-icon>
        </v-btn>
      </router-link>

    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppBar',

  data: () => ({
    
  }),
});
</script>
