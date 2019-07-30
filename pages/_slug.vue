<template>
  <page-layout>
    <template v-slot:masthead v-if="config.masthead">
      <div class="masthead" :style="mastheadStyles">
        <div class="masthead-content" v-html="mastheadHTML"></div>
      </div>
    </template>
    <template v-slot:content>
      <div class="main-content">
        <transition name="fade" mode="out-in">
          <div class="form-state" v-if="!state.submissionSuccess" key="active">
            <form @submit.prevent="submit">
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
                  <button class="button is-fullwidth" :class="buttonClass">Submit</button>
                </div>
              </div>
            </form>
          </div>
          <div class="success-state section is-size-5 has-text-centered has-text-weight-bold" v-else key="inactive">
            Submitted successfully!
          </div>
        </transition>
      </div>
    </template>
  </page-layout>

  <!-- <div class="form-view">
    <div class="masthead" :style="mastheadStyles">
      <div class="masthead-content" v-html="mastheadHTML"></div>
    </div>
    <div class="form-container">
      <transition>
        <div class="form-state" v-if="!state.submissionSuccess">
          <form @submit.prevent="submit">
            <div class="columns is-multiline">
              <div class="column" :class="field.width" v-for="field in config.fields" :key="field.name">
                <div class="field">
                  <label class="label">{{ field.label }}</label>
                  <input class="input" v-model="form[field.name]" :type="field.type" :required="field.required"/>
                </div>
              </div>
            </div>
            <button class="button is-fullwidth" :class="buttonClass">Submit</button>
          </form>
        </div>
        <div class="success-state" v-else>
          Success bitches.
        </div>
      </transition>
    
    </div>
  </div> -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { FormConfig } from '~/nuxt.config.ts'
import PageLayout from '~/layouts/page.vue'
import submission from '~/services/form-submission'
import { markdown } from 'markdown'

@Component({
  components: {
    PageLayout
  },
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

  get mastheadHTML () {
    return markdown.toHTML(this.config.masthead)
  }

  get mastheadStyles () {
    return {
      backgroundColor: this.config.backgroundColor,
      backgroundImage: '',
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
// .form-view {
//   // min-height: 100vh;
//   // display: flex;
//   // align-items: center;
//   // justify-content: center;
  
// }

.main-content {
  width: 100%;
  padding: 60px 20px;
  max-width: 560px;
  margin: 0px auto;
  // margin: -20px auto 0;
  // background: #fff;
  // border-radius: 3px;
  // border: 1px solid #eee;
}

.masthead {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 250px;
  background: #eee;
  color: #fff;
}

input, button {
  transition: all 0.3s;
}

.label {
  text-transform: uppercase;
  font-size: 0.7em;
  letter-spacing: 0.8px;
}

.submit {
  padding-top: 15px;
}

.fade-enter-active {
  animation: fade-in .5s;
}
.fade-leave-active {
  animation: fade-in .5s reverse;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
