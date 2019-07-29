<template>
  <div class="form-view" :style="styles">
    <div class="form-container">
      <div class="masthead" v-if="config.masthead">
        <div class="masthead-content" v-html="config.masthead"></div>
      </div>
      <form @submit.prevent="submit">
        <div class="columns is-multiline">
          <div class="column" :class="field.width" v-for="field in config.fields" :key="field.name">
            <div class="field">
              <label class="label">{{ field.label }}</label>
              <input class="input" v-model="form[field.name]" :type="field.type" />
            </div>
          </div>
        </div>
        <button class="button is-fullwidth" :class="buttonClass">Submit</button>
      </form>
   
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { FormConfig } from '~/nuxt.config.ts'
import submission from '~/services/form-submission'

@Component({
  asyncData (context) {
    return {
      config: !!context.payload ? context.payload : require(`~/content/forms/${context.params.slug}.json`)
    }
  }
})
export default class FormPage extends Vue {
  public config!: FormConfig
  public form: Record<string, string> = { }

  get state () {
    return submission.state
  }

  get styles () {
    return {
      backgroundColor: '',
      backgroundImage: '',
    }
  }

  get buttonClass () {
    return {
      'is-loading': !!submission.state.submissionRequest,
      'is-success': !!submission.state.submissionSuccess
    }
  }

  public submit () {
    submission.submit(this.form)
  }

  protected mounted () {
    this.form.sheet = this.config.sheet
  }

}
</script>

<style lang="scss" scoped>
.form-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.form-container {
  width: 100%;
  padding: 60px 20px;
  max-width: 560px;
}

.masthead {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}


</style>
