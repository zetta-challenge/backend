import { Controller, Get, Post, Body, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { VoicesService } from '../services'
import { AddVoice, Voice } from '../interfaces'

@Controller('voices')
export class VoicesController {
  constructor(private readonly voicesService: VoicesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async addVoice(@UploadedFiles() files: Express.Multer.File[], @Body() addVoice: AddVoice): Promise<void> {
    await this.voicesService.addVoice(files, addVoice.name, addVoice.removeBackgroundNoise)
  }

  @Get()
  async getVoices(): Promise<Voice[]> {
    return await this.voicesService.getVoices()
  }

  @Delete()
  async deleteVoice(@Body() { voiceId }: { voiceId: string }): Promise<void> {
    await this.voicesService.deleteVoice(voiceId)
  }
}
