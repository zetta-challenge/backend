import { HttpException, Injectable } from '@nestjs/common'
import { ElevenLabsClient, ElevenLabsError } from 'elevenlabs'
import { Models } from '../interfaces'

@Injectable()
export class ModelsService {
  private readonly client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY })

  async getModels(): Promise<Models[]> {
    try {
      const response = await this.client.models.getAll()
      const models: Models[] = response.map((model) => ({
        modelId: model.model_id,
        name: model.name,
        canDoTTS: model.can_do_text_to_speech,
        canDoVoiceConversion: model.can_do_voice_conversion,
        tokenCostFactor: model.token_cost_factor,
        description: model.description,
        maxCharReqFreeUser: model.max_characters_request_free_user,
        maxCharReqSubscribedUser: model.max_characters_request_subscribed_user,
        maximumTextLengthPerRequest: model.maximum_text_length_per_request,
        languages: model.languages.map((language) => ({
          languageId: language.language_id,
          name: language.name,
        })),
      }))

      return models
    } catch (e) {
      if (e instanceof ElevenLabsError) {
        throw new HttpException(e.message, e.statusCode || 500)
      } else if (e instanceof HttpException) {
        throw new HttpException(e.message, e.getStatus())
      } else {
        throw new HttpException(`Unhandled ElevenLabs API exception, ${e.message}`, 500)
      }
    }
  }
}
