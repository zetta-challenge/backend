import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { VoicesController, TtsController, ModelsController } from './controllers'
import { VoicesService, TtsService, FileService, ModelsService } from './services'

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' })],
  controllers: [VoicesController, TtsController, ModelsController],
  providers: [VoicesService, TtsService, FileService, ModelsService],
})
export class AppModule {}
