import { HttpException, Injectable } from '@nestjs/common'
import { Readable } from 'stream'

@Injectable()
export class FileService {
  async saveAudioFile(audioStream: Readable): Promise<Buffer> {
    try {
      const chunks: Buffer[] = []
      for await (const chunk of audioStream) {
        chunks.push(Buffer.from(chunk))
      }
      return Buffer.concat(chunks)
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(e.message, e.getStatus())
      } else {
        throw new HttpException(`Error processing audio file., ${e.message}`, 500)
      }
    }
  }
}
