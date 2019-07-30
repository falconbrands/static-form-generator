<template>
  <div class="form-page">
    <div class="art section is-hidden-mobile" :style="artStyles">
      
    </div>
    <div class="contents section">
      <img class="logo" v-if="config.logo" :src="config.logo"/>
      <transition name="fade" mode="out-in" appear>
        <div class="content form-container" key="form" v-if="!state.submissionSuccess">
          <h1 class="title is-size-3 is-size-2-widescreen">{{ config.title }}</h1>
          <div class="subtitle is-size-6" v-html="descriptionHTML" v-if="config.description"></div>
          <form class="form" @submit.prevent="submit">
            <div class="columns is-multiline">
              <div class="column" :class="field.width" v-for="field in config.fields" :key="field.name">
                <div class="field">
                  <label class="label">{{ field.label }}</label>
                  <input class="input" v-model="form[field.name]" :type="field.type" :required="field.required"/>
                </div>
              </div>
            </div>
            <div class="field submit">
              <div class="control">
                <button class="button is-primary is-fullwidth" :class="buttonClass">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div class="content success-container" key="success" v-else v-html="successHTML">
        
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { FormConfig } from '~/nuxt.config.ts'
import submission from '~/services/form-submission'
import { markdown } from 'markdown'

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

  get descriptionHTML () {
    return markdown.toHTML(this.config.description)
  }

  get successHTML () {
    return markdown.toHTML(this.config.successMessage)
  }

  get artStyles () {
    return {
      backgroundColor: this.config.backgroundColor,
      backgroundImage: `url(${this.config.backgroundImage})`,
    }
  }

  get buttonClass () {
    return {
      'is-loading': !!submission.state.submissionRequest,
      'is-success': !!submission.state.submissionSuccess
    }
  }

  public async submit () {
    await submission.submit(this.form)

    if (submission.state.submissionSuccess) {
      this.reset()
    }
  }

  public reset () {
    this.form = {
      sheet: this.config.sheet,
    }
  }

  protected mounted () {
    this.reset()
  }

}
</script>

<style lang="scss" scoped>
.form-page {
  display: flex;
  min-height: 100vh;
}

.art {
  background: #fafafa;
  min-width: 50%;
  background-size: cover;
  background-repeat: no-repeat;
}

.contents {
  position: relative;
  background: #fff;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
  padding-left: 3em;
  padding-right: 3em;
}

.subtitle {
  padding-top: 0.5em;
  padding-bottom: 2em;
}

.form-container {
  max-width: 500px;
}

// .form {
//   padding-top: 30px;
// }

.logo {
  position: absolute;
  top: 2em;
  left: 2em;
}

.label {
  text-transform: uppercase;
  font-size: 0.65em;
  letter-spacing: 0.8px;
}

.submit {
  padding-top: 15px;
}

.form-container.fade-enter-active {
  animation: fade-in-right .5s;
}

.form-container.fade-leave-active {
  animation: fade-in-right .5s reverse;
}

.success-container.fade-enter-active {
  animation: fade-in-left .5s;
}

.success-container.fade-leave-active {
  animation: fade-in-left .75s reverse;
}

@keyframes fade-in-left {
  0% {
    opacity: 0;
    transform: translate3d(15px, 0, 0);
  }
  
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fade-in-right {
  0% {
    opacity: 0;
    transform: translate3d(-15px, 0, 0);
  }
  
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
