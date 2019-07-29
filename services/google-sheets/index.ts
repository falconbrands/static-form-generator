import axios, { AxiosInstance } from 'axios'

export class GoogleSheetsService {
  public client: AxiosInstance

  constructor () {
    this.client = axios.create({
      baseURL: process.env.GOOGLE_SHEETS_URL,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  public submit = async (data: FormData): Promise<true> => {
    const response = await this.client.post('/', data)

    if (!!response.data.error) {
      throw new Error(response.data.error)
    }

    return true
  }

}

export default new GoogleSheetsService()