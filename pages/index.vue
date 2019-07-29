<template>
  <div>homepage</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component({
  asyncData () {
    return {
      content: false //require('~/content/about.json')
    }
  },
  head () {
    return {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
})
export default class Home extends Vue {


}
</script>
