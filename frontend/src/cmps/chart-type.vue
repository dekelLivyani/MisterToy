<script>
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  data() {
    return {
      toys: null,
       options: {
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                        size: 22
                  //   font: {
                  //   }
                }
            }
        }
    }
    };
  },
  async mounted() {
    try {
      this.$store.commit('setFilterToAll')
      await this.$store.dispatch("loadToys");
      this.loadToys();
      const dataByType = this.$store.getters.toysCountByType;
      this.renderChart({
        labels: Object.keys(dataByType),
        datasets: [
          {
            backgroundColor: ["#008E9B", "#2C73D2", "#845EC2"],
            data: Object.values(dataByType),
          },
        ],
      });
      this.options
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


 
