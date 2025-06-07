import { Body, Controller, Header, Post, Res, StreamableFile } from '@nestjs/common'
import { Response } from 'express'
import { TtsService } from '../services'
import { TextToSpeech } from '../interfaces'

@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Post('convert')
  @Header('Content-Type', 'audio/mpeg')
  @Header('Content-Disposition', 'attachment; filename="audio.mp3"')
  async convert(@Body() tts: TextToSpeech): Promise<StreamableFile> {
    const audioBuffer = await this.ttsService.convert(tts)
    return new StreamableFile(audioBuffer)
  }

  @Post('convert-timestamps')
  async convertTimestamps(@Body() tts: TextToSpeech): Promise<void> {
    await this.ttsService.convertWithTimestamps(tts)
  }

  @Post('stream')
  async streamAudio(@Body() tts: TextToSpeech, @Res() res: Response) {
    await this.ttsService.convertAsStream(tts, res)
  }

  @Post('stream-timestamps')
  async streamTimestamps(@Body() tts: TextToSpeech): Promise<void> {
    await this.ttsService.convertAsStreamWithTimestamps(tts)
  }
}
