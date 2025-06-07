import { HttpException, Injectable } from '@nestjs/common'
import { Readable } from 'stream'
import { Response } from 'express'
import { ElevenLabsClient, ElevenLabsError } from 'elevenlabs'
import { OutputFormat } from 'elevenlabs/api'
import { FileService } from '../services'
import { TextToSpeech } from '../interfaces'
import { ModelId } from '../types'

@Injectable()
export class TtsService {
  private readonly client = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY })

  constructor(private readonly fileService: FileService) {}

  async convert(tts: TextToSpeech): Promise<Buffer> {
    try {
      if (!Object.values(ModelId).includes(tts.modelId as ModelId)) {
        throw new HttpException('Invalid Model ID provided.', 400)
      } else if (!Object.values(OutputFormat).includes(tts.outputFormat as OutputFormat)) {
        throw new HttpException('Invalid Output Format provided.', 400)
      } else {
        const audioStream = await this.client.textToSpeech.convert(tts.voiceId, {
          text: tts.text,
          output_format: tts.outputFormat,
          model_id: tts.modelId,
          language_code: tts.languageCode,
          voice_settings: tts.voiceSettings,
          previous_text: tts.previousText,
          next_text: tts.nextText,
          apply_text_normalization: tts.applyTextNormalization,
        })

        return this.fileService.saveAudioFile(audioStream)
      }
    } catch (e) {
      if (e instanceof ElevenLabsError) {
        throw new HttpException(e, e.statusCode || 500)
      } else if (e instanceof HttpException) {
        throw new HttpException(e.message, e.getStatus())
      } else {
        throw new HttpException(`Unhandled ElevenLabs API exception, ${e.message}`, 500)
      }
    }
  }

  async convertWithTimestamps(tts: TextToSpeech): Promise<void> {
    try {
      if (!Object.values(ModelId).includes(tts.modelId as ModelId)) {
        throw new HttpException('Invalid Model ID provided.', 400)
      } else if (!Object.values(OutputFormat).includes(tts.outputFormat as OutputFormat)) {
        throw new HttpException('Invalid Output Format provided.', 400)
      } else {
        await this.client.textToSpeech.convertWithTimestamps(tts.voiceId, {
          text: tts.text,
          output_format: tts.outputFormat,
          model_id: tts.modelId,
          language_code: tts.languageCode,
          voice_settings: tts.voiceSettings,
          previous_text: tts.previousText,
          next_text: tts.nextText,
          apply_text_normalization: tts.applyTextNormalization,
        })
      }
    } catch (e) {
      if (e instanceof ElevenLabsError) {
        throw new HttpException(e, e.statusCode || 500)
      } else if (e instanceof HttpException) {
        throw new HttpException(e.message, e.getStatus())
      } else {
        throw new HttpException(`Unhandled ElevenLabs API exception, ${e.message}`, 500)
      }
    }
  }

  async convertAsStream(tts: TextToSpeech, res: Response): Promise<void> {
    try {
      if (!Object.values(ModelId).includes(tts.modelId as ModelId)) {
        throw new HttpException('Invalid Model ID provided.', 400)
      } else if (!Object.values(OutputFormat).includes(tts.outputFormat as OutputFormat)) {
        throw new HttpException('Invalid Output Format provided.', 400)
      } else {
        const audioStream: Readable = await this.client.textToSpeech.convertAsStream(tts.voiceId, {
          text: tts.text,
          output_format: tts.outputFormat,
          model_id: tts.modelId,
          language_code: tts.languageCode,
          voice_settings: tts.voiceSettings,
          previous_text: tts.previousText,
          next_text: tts.nextText,
          apply_text_normalization: tts.applyTextNormalization,
        })

        res.set({
          'Content-Type': 'audio/mpeg',
          'Transfer-Encoding': 'chunked',
        })

        audioStream.pipe(res)
      }
    } catch (e) {
      if (e instanceof ElevenLabsError) {
        throw new HttpException(e, e.statusCode || 500)
      } else if (e instanceof HttpException) {
        throw new HttpException(e.message, e.getStatus())
      } else {
        throw new HttpException(`Unhandled ElevenLabs API exception, ${e.message}`, 500)
      }
    }
  }

  async convertAsStreamWithTimestamps(tts: TextToSpeech): Promise<void> {
    try {
      if (!Object.values(ModelId).includes(tts.modelId as ModelId)) {
        throw new HttpException('Invalid Model ID provided.', 400)
      } else if (!Object.values(OutputFormat).includes(tts.outputFormat as OutputFormat)) {
        throw new HttpException('Invalid Output Format provided.', 400)
      } else {
        const response = await this.client.textToSpeech.streamWithTimestamps(tts.voiceId, {
          text: tts.text,
          output_format: tts.outputFormat,
          model_id: tts.modelId,
          language_code: tts.languageCode,
          voice_settings: tts.voiceSettings,
          previous_text: tts.previousText,
          next_text: tts.nextText,
          apply_text_normalization: tts.applyTextNormalization,
        })
        for await (const item of response) {
          console.log(item)
        }
      }
    } catch (e) {
      if (e instanceof ElevenLabsError) {
        throw new HttpException(e, e.statusCode || 500)
      } else if (e instanceof HttpException) {
        throw new HttpException(e.message, e.getStatus())
      } else {
        throw new HttpException(`Unhandled ElevenLabs API exception, ${e.message}`, 500)
      }
    }
  }
}
