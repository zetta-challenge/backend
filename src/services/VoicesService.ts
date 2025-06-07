import { HttpException, Injectable } from '@nestjs/common'
import { ElevenLabsClient, ElevenLabsError } from 'elevenlabs'
import { AddVoiceIvcResponseModel } from 'elevenlabs/api'
import { Voice } from '../interfaces'

@Injectable()
export class VoicesService {
  private readonly client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY })

  async getVoices(): Promise<Voice[]> {
    try {
      const response = await this.client.voices.getAll()
      const voices: Voice[] = response.voices.map((voice) => ({
        voiceId: voice.voice_id,
        name: voice.name,
      }))

      return voices
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

  async addVoice(files: Express.Multer.File[], name: string, removeBackgroundNoise: boolean = false): Promise<AddVoiceIvcResponseModel> {
    try {
      const blobs = files.map((file) => new Blob([file.buffer], { type: file.mimetype }))

      const response = await this.client.voices.add({
        files: blobs,
        name,
        remove_background_noise: removeBackgroundNoise,
      })

      return response
    } catch (e) {
      if (e instanceof ElevenLabsError) {
        let message = 'An error occurred while creating the voice.'
        if (typeof e.body === 'object' && e.body !== null && 'detail' in e.body) {
          const detail = (e.body as { detail: { message?: string } }).detail
          message = detail.message || message
        }
        throw new HttpException({ statusCode: e.statusCode || 500, message }, e.statusCode || 500)
      } else if (e instanceof HttpException) {
        throw new HttpException(e.message, e.getStatus())
      } else {
        throw new HttpException(`Unhandled ElevenLabs API exception, ${e.message}`, 500)
      }
    }
  }

  async deleteVoice(voiceId: string): Promise<void> {
    try {
      await this.client.voices.delete(voiceId)
    } catch (e) {
      if (e instanceof ElevenLabsError) {
        let message = 'An error occurred while deleting the voice.'
        if (typeof e.body === 'object' && e.body !== null && 'detail' in e.body) {
          const detail = (e.body as { detail: { message?: string } }).detail
          message = detail.message || message
        }
        throw new HttpException({ statusCode: e.statusCode || 500, message }, e.statusCode || 500)
      } else if (e instanceof HttpException) {
        throw new HttpException(e.message, e.getStatus())
      } else {
        throw new HttpException(`Unhandled ElevenLabs API exception, ${e.message}`, 500)
      }
    }
  }
}
