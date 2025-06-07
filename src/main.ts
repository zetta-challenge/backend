import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: [process.env.CORS_ORIGINS],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ extended: true, limit: '50mb' }))
  await app.listen(process.env.PORT ?? 8080)
}
bootstrap()
