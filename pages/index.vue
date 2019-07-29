<template>
  <div>
    HEY
  </div>
  <!-- <form @submit.prevent="submit">
    <div v-for="(field, $index) in fields" :key="$index">
      <input v-model="form[field]" name="email" required/>
    </div>
    <button>Submit</button>
  </form> -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import sheets from '~/services/google-sheets'

@Component({

})
export default class HomePage extends Vue {
  public submitting: boolean = false
  public fields: string[] = ['email', 'first name']
  public form: Record<string, string> = {
    sheet: 'Sheet1'
  }

  
  // form = {} as Record<string, string>
  // public submitting: boolean = false

  async submit () {
    this.submitting = true

    try {

    } catch (e) {

    }

    
    // const data = new FormData()
    // data.set('sheet', 'Sheet1')

    // Object.keys(this.form).forEach((key) => {
    //   data.set(key, this.form[key])
    // })


    // data.set('email', this.form.email)
    // data.set('sheet', 'Sheet1')
    // data.set('first name', 'something!')

  


    // const response = await axios.post(process.env.GOOGLE_SHEETS_URL, data, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })

    // console.log(response)
    // // 'https://script.google.com/macros/s/AKfycbycWtOanxuhteTNs6MgvX-DAUoFFYM8GPNONOlj9ns75JLkQuc/exec'
  }

}
</script>
