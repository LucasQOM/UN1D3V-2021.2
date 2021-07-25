<template>
  <v-container>
    <div class="d-flex justify-center mb-16">
      <v-img src="@/assets/logo_unime_horizontal.png" max-width="300px"></v-img>
    </div>
    <v-row>
      <v-col cols="12" sm="6" class="justify-start">
        <h1 class="red--text text--darken-1">Listagem de alunos cadastrados</h1>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-divider
      style="border-width: medium 0 0 0; border-color: black"
      class="mb-12"
    ></v-divider>
    <v-row v-if="success">
      <v-col cols="12">
        <v-alert dense text type="success">
          Usuario Cadastrado com sucesso
        </v-alert>
      </v-col>
    </v-row>
    <v-row v-if="error">
      <v-col cols="12">
        <v-alert dense outlined type="error">
          Ocorreu um erro no processo ou os campos estao vazios
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card elevation="3" class="rounded-lg" style="padding: 34px">
          <v-row class="row-names d-flex content-between">
            <v-col cols="12" sm="4">
              <div>
                <h2 class="red--text text--darken-1">Nome</h2>
                <v-text-field
                  v-model="name"
                  placeholder="Informe o nome do aluno"
                  solo-inverted
                ></v-text-field>
              </div>
            </v-col>
            <v-col cols="12" sm="3">
              <div>
                <h2 class="red--text text--darken-1">R.A</h2>
                <v-text-field
                  v-model="ra"
                  placeholder="Informe o R.A do aluno"
                  solo-inverted
                ></v-text-field>
              </div>
            </v-col>
            <v-col cols="12" sm="3">
              <div>
                <h2 class="red--text text--darken-1">Curso</h2>
                <v-select
                  v-model="course"
                  :items="courses"
                  item-text="name"
                  item-value="name"
                  placeholder="Informe o curso do aluno"
                  solo-inverted
                ></v-select>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="2"
              class="d-flex justify-center align-center mt-2"
            >
              <v-btn
                @click="registerUser"
                tile
                color="red"
                class="rounded-lg white--text"
                x-large
              >
                Cadastrar
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="3" class="rounded-lg" style="padding: 34px">
          <h2 class="red--text text--darken-1">Alunos cadastrados por curso</h2>
          <div class="container">
            <!-- chart -->
            <!-- <line-chart :data="{'2021-01-01': 11, '2021-01-02': 6}"></line-chart> -->
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";



export default {
  name: "Cadastro",
  data() {
    return {
      courses: [],
      name: "",
      ra: "",
      course: "",
      success: false,
      error: false,

      //   chartData: {
      //       '2017-05-13': 2,
      //       '2017-05-14': 5,
      //       '2017-05-15': 4
      //   }
    };
  },
  mounted() {
    this.loadCourses();
  },
  methods: {
    loadCourses() {
      this.courses = [];
      axios.get("http://localhost:3000/courses").then((response) => {
        response.data.forEach((element) => {
          this.courses.push({
            id: element.id,
            name: element.name,
          });
        });
      });
    },
    registerUser() {
      if (this.name != "" && this.ra != "" && this.course != "") {
        axios
          .post("http://localhost:3000/students", {
            name: this.name,
            ra: this.ra,
            course: this.course,
            deleted: false,
          })
          .then((resp) => {
            this.success = true;
            this.error = false;
          })
          .catch((error) => {
            this.success = false;
            this.error = true;
          });
      } else {
        this.success = false;
        this.error = true;
      }
    },
  },
};
</script>