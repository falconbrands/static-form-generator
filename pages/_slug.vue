<template>
  <div>{{ title }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import airtable from '~/services/airtable'

export interface AirtableData {

}

@Component({
  asyncData (context) {
    if (!!context.payload) return context.payload

    return require('~/content/pages/' + context.params.slug + '.json')
  }
})
export default class SlugPage extends Vue implements AirtableData {
  // table = airtable(this.tableId)

}
</script>
