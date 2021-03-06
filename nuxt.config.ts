import NuxtConfiguration from '@nuxt/config'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

export interface FormConfig {
  fields: any[]
  masthead: string
  path: string
  sheet: string
  description?: string
  backgroundColor?: string
  backgroundImage?: string
  buttonColor?: string
  logo?: string
  successMessage: string
}

const config: NuxtConfiguration = {
  generate: {
    async routes () {
      const PAGES_DIR = './content/forms'

      // create absolute file paths
      const filenames = fs.readdirSync(PAGES_DIR).map((filename) => {
        return path.resolve(PAGES_DIR, filename)
      })
      
      // generate route objects from file paths
      const routes = filenames.map((filename: string) => ({
        route: path.basename(filename, '.json'), // path is assumed to be in the format [slug].json
        payload: JSON.parse(fs.readFileSync(filename, 'utf8')),
      }))

      return routes
    }
  },
  env: {
    GOOGLE_SHEETS_URL: `${process.env.GOOGLE_SHEETS_URL}`,
    ...dotenv.config().parsed,
  },
}

export default config
