<template>
  <nuxt/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SiteFooter from '~/components/SiteFooter.vue'

@Component({
  components: {
    SiteFooter,
  }
})
export default class DefaultLayout extends Vue {
 
}
</script>

<style lang="scss">
$family-sans-serif: 'Roboto', BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
$primary: #0676ee;
$input-background-color: #f6f9f8;
$input-border-color: rgba(255, 255 ,255, 0);
$input-hover-border-color: rgba(255, 255 ,255, 0);
$input-focus-border-color: rgba(255, 255 ,255, 0);
$button-active-border-color: rgba(255, 255 ,255, 0);
$input-shadow: 0;
$label-color: #aaa;
$input-focus-box-shadow-size: 0;

@import "bulma";

.input:focus {
  background-color: #eee;
}
</style>

<style lang="scss" scoped>

</style>

