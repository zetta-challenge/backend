export interface Models {
  modelId: string
  name?: string
  canDoTTS?: boolean
  canDoVoiceConversion?: boolean
  tokenCostFactor?: number
  description?: string
  maxCharReqFreeUser?: number
  maxCharReqSubscribedUser?: number
  maximum_text_length_per_request?: number
  languages?: object[]
}
