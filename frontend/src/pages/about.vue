<template>
  <div class="about">
    <GmapMap :center="center" :zoom="zoom" map-type-id="terrain">
      <GmapMarker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="true"
        :title="m.title"
        @click="clickOnBranch(m)"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markers: [
        { position: { lat: 32.109323, lng: 34.855429 } ,title:'Tel Aviv-Yafo'},
        { position: { lat: 31.771959, lng: 35.217018 } ,title:'Jerusalem'},
        { position: { lat: 32.794044, lng: 34.989571 } ,title:'Haifa'},
        { position: { lat: 29.55805, lng: 34.94821 } ,title:'Eilat'},
      ],
      center: { lat: 31.771959, lng: 35.217018 },
      zoom: 7,
    };
  },
  methods: {
    clickOnBranch(marker) {
      this.center = marker.position;
      this.zoom = 12;
    },
  },
};
</script>



