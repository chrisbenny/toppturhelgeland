<template>
  <div>
    <l-map style="height: 800px" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import L from 'leaflet'

export default {
  name: 'example',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      zoom: 13,
      center: L.latLng(66.373220, 14.952482),
      url: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}',
      attribution: '&copy; <a href="http://www.kartverket.no/">Kartverket</a> contributors',
      marker: L.latLng(66.373220, 14.952482)
    }
  },
  methods: {
    mounted () {
      this.$refs.map.mapObject._onResize()
    }
  }
}
</script>
