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
    <v-row>
      <v-col cols="12" sm="6">
        <v-card elevation="3" class="rounded-lg" style="padding: 34px">
          <h2 class="red--text text--darken-1 ml-5">Excluir aluno pelo R.A</h2>
          <v-row>
            <v-col cols="12" sm="8" class="mr-3 ml-5">
              <v-text-field
                v-model="aux"
                placeholder="Informe o R.A do aluno"
                solo-inverted
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="d-flex justify-center fill-height">
              <v-btn
                @click="deleteUserByRA"
                tile
                color="red"
                class="rounded-lg white--text"
                x-large
              >
                <v-icon left>mdi-trash-can-outline</v-icon>
                Excluir
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" class="">
        <v-card elevation="3" class="red darken-1 rounded-lg fill-height">
          <div class="pa-5">
            <h1 class="white--text text-center">Total de alunos</h1>
            <h1 class="white--text text-center">Cadastrados</h1>
            <h1 class="white--text text-center">{{ students.length }}</h1>
          </div>
        </v-card></v-col
      >
      <v-col cols="12" sm="3" class="">
        <v-card elevation="3" class="grey darken-1 rounded-lg fill-height">
          <div class="pa-5">
            <h1 class="white--text text-center">Total de alunos</h1>
            <h1 class="white--text text-center">Excluidos</h1>
            <h1 class="white--text text-center">
              {{ deletedStudents.length }}
            </h1>
          </div>
        </v-card></v-col
      >
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="3" class="rounded-lg" style="padding: 34px">
          <h2 class="red--text text--darken-1">Alunos Cadastrados</h2>
          <v-data-table
            :headers="headers"
            :items="students"
            :items-per-page="5"
            item-key="name"
            class="elevation-1"
            :footer-props="{ 'items-per-page-text': 'Items por pagina' }"
          >
            <template v-slot:item="row">
              <tr>
                <td>{{ row.item.name }}</td>
                <td>{{ row.item.ra }}</td>
                <td>{{ row.item.course }}</td>
                <td>
                  <v-btn
                    icon
                    elevation="0"
                    color="white"
                    @click="deleteUserById(row.item.id, row.index)"
                  >
                    <v-icon color="red darken-1">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="3" class="rounded-lg" style="padding: 34px">
          <h2 class="red--text text--darken-1">Alunos Removidos</h2>
          <v-data-table
            :headers="deletedHeaders"
            :items="deletedStudents"
            :items-per-page="5"
            item-key="name"
            class="elevation-1"
            :footer-props="{ 'items-per-page-text': 'Items por pagina' }"
          >
            <template v-slot:item="row">
              <tr>
                <td
                  class="
                    text-decoration-line-through
                    grey--text
                    text--lighten-2
                  "
                >
                  {{ row.item.name }}
                </td>
                <td
                  class="
                    text-decoration-line-through
                    grey--text
                    text--lighten-2
                  "
                >
                  {{ row.item.ra }}
                </td>
                <td
                  class="
                    text-decoration-line-through
                    grey--text
                    text--lighten-2
                  "
                >
                  {{ row.item.course }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Listagem",
  data() {
    return {
      headers: [
        {
          text: "Nome",
          aling: "start",
          value: "name",
          class: "grey white--text text-table",
        },
        {
          text: "R.A",
          value: "ra",
          class: "grey white--text text-table",
        },
        {
          text: "Curso",
          value: "course",
          class: "grey white--text text-table",
        },
        {
          text: "Ação",
          class: "grey white--text text-table",
        },
      ],
      deletedHeaders: [
        {
          text: "Nome",
          aling: "start",
          value: "name",
          class: "grey white--text text-table",
        },
        {
          text: "R.A",
          value: "ra",
          class: "grey white--text text-table",
        },
        {
          text: "Curso",
          value: "course",
          class: "grey white--text text-table",
        },
      ],
      students: [],
      deletedStudents: [],
      countDeletedStudents: "",
      deleted: true,
      aux: "",
      studentId: "",
      studentIndex: "",
    };
  },
  mounted() {
    this.loadStudents();
  },
  methods: {
    loadStudents() {
      this.students = [];
      this.deletedStudents = [];
      axios.get("http://localhost:3000/students").then((response) => {
        response.data.forEach((element) => {
          if (element.deleted === false) {
            this.students.push({
              id: element.id,
              name: element.name,
              ra: element.ra,
              course: element.course,
            });
          } else {
            this.deletedStudents.push({
              id: element.id,
              name: element.name,
              ra: element.ra,
              course: element.course,
            });
          }
        });
      });
    },
    deleteUserById(id, index) {
      axios
        .put(`http://localhost:3000/students/${id}/`, {
          name: this.students[index].name,
          ra: this.students[index].ra,
          course: this.students[index].course,
          id: this.students[index].id,
          deleted: true,
        })
        .then((resp) => {
          this.loadStudents();
        });
    },
    deleteUserByRA() {
      if (this.aux != "") {
        this.students.forEach((student, index) => {
          if (this.aux == student.ra) {
            this.studentId = student.id;
            this.studentIndex = index;
          }
        });
        this.deleteUserById(this.studentId, this.studentIndex);
      }
    },
  },
};
</script>