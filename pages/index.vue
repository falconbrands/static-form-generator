<template>
  <div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({

})
export default class HomePage extends Vue {

  public redirectWithHash () {
    
  }

  mounted () {
    if (!!this.$route.hash && this.$route.hash.search('invite_token') > -1) {
      window.location.href = '/admin' + this.$route.hash
    }
  }
}
</script>
