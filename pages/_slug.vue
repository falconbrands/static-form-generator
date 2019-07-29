<template>
  <div>this is a slug!</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component({
  asyncData (context) {
    console.log(context)

    return { foo: 'bar' }
  }
})
export default class SlugPage extends Vue {


}
</script>
