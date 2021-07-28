<template>
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import ChartData from "@/chart-data.js";
import axios from "axios";

function groupByKey(array, key) {
  return array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    });
  }, {});
}

Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

var data = [];

export default {
  name: "dataChart",
  data() {
    return {
      ChartData: ChartData,
    };
  },
  methods: {
    async getData() {
      ChartData.data.datasets[0].data = [];
      await axios
        .get("http://localhost:3000/students")
        .then((response) => {
          data.push(groupByKey(response.data, "course"));
        })
        
        ChartData.data.labels = Object.getOwnPropertyNames(data[0]);
        for (var i = 0; i < Object.size(data[0]); i++) {
          ChartData.data.datasets[0].data.push(
            data[0][ChartData.data.labels[i]].length
          );
        }
    },
  },
  mounted() {
    const ctx = document.getElementById("chart");
    new Chart(ctx, this.ChartData);
  },
  beforeMount(){
    this.getData()
  },
};
</script>