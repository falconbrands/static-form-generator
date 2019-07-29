import Airtable from 'airtable'

const airtable = new Airtable({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
})

if (!process.env.AIRTABLE_BASE) {
  throw new Error('Missing AIRTABLE_BASE_ID in environment variables.')
}

export default airtable.base(process.env.AIRTABLE_BASE)
