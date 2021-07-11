<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  data() {
    return {
      toys: null,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: 20,
              },
            },
          ],
        },
      },
    };
  },
  async mounted() {
    try {
      this.$store.commit("setFilterToAll");
      await this.$store.dispatch("loadToys");
      this.loadToys();
      const dataByTypeInStock = this.$store.getters.toysInStockByType;
      this.renderChart(
        {
          labels: Object.keys(dataByTypeInStock),
          datasets: [
            {
              label: "In Stock",
              backgroundColor: ["#008E9B", "#845EC2", "#2C73D2"],
              data: Object.values(dataByTypeInStock),
            },
          ],
        },
        this.options
      );
    } catch (err) {
      console.log("cannot laod toys", err);
      throw err;
    }
  },

  methods: {
    loadToys() {
      this.toys = this.$store.getters.toys;
    },
  },
};
</script>


 
 
  