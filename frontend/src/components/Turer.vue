<template>
  <div>
    <div class="loading" v-if="loading">
      Laster...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <ul class="list">
      <li v-for="tur in turer" class="list__item" :key="tur._id">
        <router-link :to="{name: 'tur', params: {id: tur._id}}">
            <h2>{{tur.title}}</h2>
            <img v-if="tur.mainImage" :src="imageUrlFor(tur.mainImage).ignoreImageParams().width(300)"/>
            <div>
               
            <span v-if="tur.author" class="tur-liste__authored-by">
              Directed by {{tur.author}}
            </span>
            </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import sanity from '../sanity'
import imageUrlBuilder from '@sanity/image-url'

const imageBuilder = imageUrlBuilder(sanity)

const query = `*[_type == "tur"] {
  _id,
  title,
  mainImage,
  publishedAt,
  "author": author[job == "Director"][0].person->name,
}[0...50]`

export default {
  name: 'Turer',
  data () {
    return {
      loading: true,
      turer: []
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    imageUrlFor (source) {
      return imageBuilder.image(source)
    },
    fetchData () {
      this.error = this.post = null
      this.loading = true
      sanity.fetch(query).then(turer => {
        this.loading = false
        this.turer = turer
      }, error => {
        this.error = error
      })
    }
  }
}
</script>

<style scoped>
.list {
  margin: 1rem;
  width: 10%;
}
.tur-liste__authored-by {
  display: block;
  font-size: 1rem;
}

h2{
text-align: center;
color: #0004;

}

</style>
