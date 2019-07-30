import sheets from '~/services/google-sheets'
import Vue from 'vue'

const SUCCESS_TIMEOUT_DURATION = 4000

export interface FormSubmissionServiceState {
  submissionSuccess: true | null
  submissionRequest: Promise<any> | null
  submissionFailure: Error | null
  submissionSuccessTimeout: number | null
}

export class FormSubmissionService {
  public state = Vue.observable<FormSubmissionServiceState>({
    submissionRequest: null,
    submissionSuccess: null,
    submissionFailure: null,
    submissionSuccessTimeout: null,
  })

  public submit = async (submission: Record<string, string>) => {
    try {
      const data = this.generateFormData(submission)
      const request = sheets.submit(data)

      this.onSubmissionRequest(request)
      this.onSubmissionSuccess(await request)
    } catch (e) {
      this.onSubmissionFailure(e)
    }
  }

  public onSubmissionRequest = (request: Promise<true>) => {
    this.state.submissionRequest = request
    this.state.submissionFailure = null

    if (!!this.state.submissionSuccessTimeout) {
      clearTimeout(this.state.submissionSuccessTimeout)
    }
  }

  public onSubmissionSuccess = (success: true) => {
    this.state.submissionRequest = null
    this.state.submissionSuccess = success
    this.state.submissionSuccessTimeout = window.setTimeout(this.onSubmissionReset, SUCCESS_TIMEOUT_DURATION)
  }

  public onSubmissionFailure = (error: Error) => {
    this.state.submissionRequest = null
    this.state.submissionFailure = error
  }

  public onSubmissionReset = () => {
    this.state.submissionSuccess = null
    this.state.submissionSuccessTimeout = null
  }

  public generateFormData = (payload: Record<string, string>): FormData => {
    const data = new FormData()

    Object.keys(payload).forEach((key) => {
      data.set(key, payload[key])
    })

    return data
  }
}

export default new FormSubmissionService()