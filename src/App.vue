<template>
  <v-app>
    <AppBar></AppBar>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
      
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/components/AppBar';

export default Vue.extend({
  name: 'App',

  components: {
    AppBar
  },

  data: () => ({
    //
  }),
});
</script>
