<template>
  <section class="charts">
    <chart-type class="chart-type"/>
    <chart-instock class="chart-instock"/>
  </section>
</template>

<script>
import ChartInstock from "../cmps/chart-instock.vue";
import chartType from "../cmps/chart-type.vue";
export default {
  components: {
    chartType,
    ChartInstock,
  },
};
</script>
