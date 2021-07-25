<template>
  <v-app>
    <div>
      <v-app-bar color="red accent-4" dense dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Desafio UN1D3V - Sistema de Alunos</v-toolbar-title>

        <v-spacer></v-spacer>

      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="red--text text--accent-4"
          >
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.redirect"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-main class="align-center">
      <v-container class="d-flex justify-center">
        <router-view />
      </v-container>
    </v-main>
    <v-footer padless class="white">
      <v-col class="text-center" cols="12">
        <p class="grey--text text--darken-1">
          Projeto de conclusao do curso de ferias: Javascript e VueJS
        </p>
        <p class="grey--text text--darken-1 mt-n4">
          Desenvolvido por
          <strong class="red--text text--darken-1">Eduardo Berg</strong> e
          <strong class="red--text text--darken-1">Lucas Queiroz</strong>
        </p>
      </v-col>
    </v-footer>
  </v-app>
</template>

<style>
.text-table {
  font-size: 16px !important;
}

.row-names{
  margin-left: 1px !important
}
</style>


<script>

export default {
  name: "App",

  data: () => ({
    items: [
      {
        title: "Home",
        redirect: "/",
        icon: "mdi-home",
      },
      {
        title: "Cadastro",
        redirect: "/cadastro",
        icon: "mdi-account-plus",
      },
      {
        title: "Listagem",
        redirect: "/listagem",
        icon: "mdi-format-list-bulleted-square",
      },
    ],
    drawer: false,
    group: null,
  }),
};
</script>
