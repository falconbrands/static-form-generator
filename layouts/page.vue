<template>
  <div class="site-content">
    <div class="masthead-container">
      <slot name="masthead"></slot>
    </div>
    <div class="main-container">
      <slot name="content"></slot>
    </div>
    <site-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SiteFooter from '~/components/SiteFooter.vue'

@Component({
  components: {
    SiteFooter,
  }
})
export default class PageLayout extends Vue {
 
}
</script>

<style lang="scss" scoped>
.site-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-container {
  flex: 1;
}
</style>

