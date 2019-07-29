import NuxtConfiguration from '@nuxt/config'
import fs from 'fs'
import path from 'path'

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
  modules: [
    '@nuxtjs/dotenv',
  ],
  // generate: {
  //   async routes () {
  //     // const products = await shopify.product.fetchAll()
  //     // console.log(products)

  //     return []
  //     // const products = await shopify.product.fetchAll()

  //     // return products.map((product) => ({
  //     //   route: '/products/' + product.id,
  //     //   payload: product,
  //     // }))
  //   }
  // },
  // plugins: ['shopify-buy']
  // modules: ['nuxt-shopify'],
  // shopify: {
  //   domain: 'graphql.myshopify.com',
  //   storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38',
  // },
}

export default config
