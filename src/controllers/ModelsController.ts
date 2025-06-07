import { Controller, Get } from '@nestjs/common'
import { ModelsService } from '../services'
import { Models } from '../interfaces'

@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Get()
  async getModels(): Promise<Models[]> {
    return await this.modelsService.getModels()
  }
}
