<template>
  <div>{{ title }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component({
  asyncData (context) {
    if (!!context.payload) return context.payload

    return require('~/content/pages/' + context.params.slug + '.json')
  }
})
export default class SlugPage extends Vue {


}
</script>
