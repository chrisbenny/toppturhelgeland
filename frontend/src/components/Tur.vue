<template>
  <div class="tur">
    <div class="loading" v-if="loading">
      Laster...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="tur">
      <div
        class="header"
        :style="[{
          backgroundImage: `url(${imageUrlFor(tur.mainImage)})`,
          backgroundPosition: `${(tur.mainImage.hotspot.x - tur.mainImage.crop.left) * 100}% ${(tur.mainImage.hotspot.y - tur.mainImage.crop.top) * 100}%`
          }
        ]"
      >
        <div class="header-content">
          <h1>{{tur.title}}</h1>
        </div>
      </div>
        <div className="main-content">
          <div v-html="bodyHtml" class="body" />
        </div>
    </div>
  </div>
</template>

<script>
import sanity from '../sanity'
import blocksToHtml from '@sanity/block-content-to-html'
import imageUrlBuilder from '@sanity/image-url'

const imageBuilder = imageUrlBuilder(sanity)

const query = `*[_type == "tur" && _id == $id] {
  _id,
  title,
  gpxfil,
  body,
  mainImage,
  "mainImageUrl": mainImage.asset->url,
}[0]
`

export default {
  props: {
    id: {
      type: String
    }
  },
  name: 'Tur',
  data () {
    return {
      loading: true,
      tur: null
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
      this.error = this.tur = null
      this.loading = true

      const serializers = {
        types: {
          summaries: props => {
            const h = blocksToHtml.h

            if (!props.node.summaries) {
              return false
            }

            const summariesArray = props.node.summaries.map(summary => {
              return (
                h('div', null, [
                  h('p', null, summary.summary),
                  h('span', null, '—'),
                  h('a', {href: summary.url}, summary.author)
                ])
              )
            })

            return (
              h('div', [
                h('h1', null, props.node.caption),
                h('div', null, summariesArray)
              ])
            )
          }
        }
      }

      sanity.fetch(query, {id: this.id}).then(tur => {
        this.loading = false
        this.tur = tur
        this.bodyHtml = blocksToHtml({
          blocks: this.tur.body,
          serializers: serializers,
          dataset: sanity.clientConfig.dataset,
          projectId: sanity.clientConfig.projectId
        })
      }, error => {
        this.error = error
      })
    }
  }
}
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column-reverse;
  max-width: 100rem;
  margin: 1rem auto;
  padding: 0 1rem;
}

.body {
  font-size: 1.5em;
  text-align: center;
}

.sidebar {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  flex-grow: 1;
}

.main-content {
  flex-grow: 3;
}

.tur > h2 {
  margin: 2rem 0 0 0;
  padding: 0 0.5rem;
  border-bottom: 1px solid #ccc;
}

.mainImage {
  display: block;
  width: 100%;
}

.header {
  background-size: cover;
  padding-top: 10rem;
}

.header h1 {
  font-size: 10vw;
  line-height: 1em;
  margin: 1rem 0 0 0;
  padding: 0;
}

.header > img {
  width: 100%;
  display: block;
}

.header .header-content {
  color: #fff;
  text-align: center;
  padding-top: 5em;
  padding-bottom: 2em;
  background-image: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 90%);
}

.body :global(figure) {
  margin: 0;
  padding: 0;
}

.body :global(img) {
  display: block;
  max-width: 100%;
  box-sizing: border-box;
}

@media screen and (min-width: 500px) {
  .content {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 2fr 5fr;
    padding: 1rem;
  }

  .body :global(p) {
    margin-top: 0;
  }

  .cast-person-name {
    display: block;
    font-size: 1.2em;
    font-weight: 500;
    line-height: 1.2em;
  }

  .cast-list-link span {
    display: block;
  }
}

.body :global(figure) {
  margin: 0;
  padding: 0;
}

.body :global(img) {
  display: inline-block;
  border: 10px solid transparent;
  padding: 15px;
  border-image:url(https://openclipart.org/download/253841/Border-21--Arvin61r58.svg) 50 round;
  max-width: 50%;
  box-sizing: border-box;
}

@media screen and (max-width: 499px) {
  .cast-character-name::before {
    content: ' as ';
  }
}

@media screen and (min-width: 500px) {
  .content {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 2fr 5fr;
    padding: 1rem;
  }

  .body :global(p) {
    margin-top: 0;
  }
}
</style>
