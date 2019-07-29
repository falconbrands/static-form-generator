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
    // if (!!context.payload) return context.payload

    // return require('~/content/forms/' + context.params.slug + '.json')
  }
})
export default class FormPage extends Vue implements AirtableData {
  // table = airtable(this.tableId)

}
</script>
