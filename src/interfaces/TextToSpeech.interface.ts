import { OutputFormat, BodyTextToSpeechV1TextToSpeechVoiceIdPostApplyTextNormalization, VoiceSettings } from 'elevenlabs/api'
export interface TextToSpeech {
  voiceId: string
  text: string
  outputFormat?: OutputFormat
  modelId?: string
  languageCode?: string
  voiceSettings?: VoiceSettings
  previousText?: string
  nextText?: string
  applyTextNormalization?: BodyTextToSpeechV1TextToSpeechVoiceIdPostApplyTextNormalization
}
