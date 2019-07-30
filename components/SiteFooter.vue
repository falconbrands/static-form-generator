<template>
  <footer class="site-footer">
    <small>&#169; 2019 | Powered by Falcon</small>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SiteFooter extends Vue {



}
</script>

<style lang="scss" scoped>
.site-footer {
  color: #ccc;
  background: #fafafa;
  font-weight: bold;
  text-align: center;
  padding: 2em 2em;
}
</style>
