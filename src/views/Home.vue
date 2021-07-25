<template>
  <div>
    <h1>
      Bem vindo, site feito como teste para ingressar no núcleo de
      desenvolvimento UN1D3V da faculdade UNIME
    </h1>
    <h2 class="text-center mt-16">Desenvolvido por:</h2>
    <v-main class="align-center">
      <v-container class="d-flex justify-center">
        <div>
          <a :href="piphiz.html_url" style="text-decoration:none">
            <v-avatar size="200">
              <v-img :src="piphiz.avatar_url"></v-img>
            </v-avatar>
            <h2 class="text-center black--text">{{ piphiz.name }}</h2></a
          >
        </div>
        <div class="ml-10">
          <a :href="lucas.html_url" style="text-decoration:none">
            <v-avatar size="200">
              <v-img :src="lucas.avatar_url"></v-img>
            </v-avatar>
            <h2 class="text-center black--text">{{ lucas.name }}</h2></a
          >
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      piphiz: [],
      lucas: [],
    };
  },
  mounted() {
    this.loadProfiles();
  },
  methods: {
    loadProfiles() {
      axios.get("https://api.github.com/users/piphiz").then((response) => {
        this.piphiz = response.data;
      });
      axios.get("https://api.github.com/users/lucasqom").then((response) => {
        this.lucas = response.data;
      });
    },
  },
};
</script>
