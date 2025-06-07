# 🎙️ ElevenLabs Backend API

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-000000?style=for-the-badge&logo=elevenlabs&logoColor=white)](https://elevenlabs.io/)

A robust NestJS backend API for ElevenLabs text-to-speech services. Provides voice management, model information, and high-quality speech synthesis with real-time streaming capabilities.

## 🚀 Quick Start

> **It is recommended to clone this project inside a common folder alongside the frontend and/or infrastructure repos!**

**📋 Prerequisites:** 
- Node.js (v22 or higher)
- ElevenLabs API key
- npm or pnpm package manager

## ✨ Features

- 🎵 **Voice Management** - Create, retrieve, and delete custom voices
- 🤖 **Model Information** - Access all available ElevenLabs TTS models
- 🔊 **Text-to-Speech** - Convert text to high-quality speech
- ⚡ **Real-time Streaming** - Stream audio generation in real-time
- 📊 **Timestamp Support** - Generate speech with word-level timestamps
- 🔄 **File Processing** - Handle audio file uploads with background noise removal
- 🛡️ **Error Handling** - Comprehensive error handling and validation
- 🌐 **CORS Support** - Configurable cross-origin resource sharing

## 🛠️ Technology Stack

- **Framework:** NestJS with TypeScript
- **API Integration:** ElevenLabs SDK
- **File Upload:** Multer middleware
- **Configuration:** @nestjs/config
- **Error Handling:** Custom HTTP exceptions
- **Streaming:** Node.js streams

## ⚡ Quick Local Start

```bash
# NPM
npm install
npm run start:dev

# PNPM
pnpm i
pnpm start:dev
```

The API will be available at `http://localhost:8080/api`

## 🔧 Configuration
### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ELEVENLABS_API_KEY` | Your ElevenLabs API key | ✅ |
| `PORT` | Server port | ❌ (default: 8080) |
| `CORS_ORIGINS` | Allowed frontend origins | ❌ (default: all) |

For this purpose you can just copy the example file that will work locally out of the box.
Inside the root of the repo  - `cp .env.example .env` or use the vars below

```env
# ElevenLabs Configuration
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Server Configuration
PORT=8080
NODE_ENV=development

# CORS Configuration
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### [API Endpoints](docs/api-endpoints.md) - *please read* - (No time for swagger) 

## 🔍 Supported Features

### Audio Formats
- **MP3:** Various quality levels (32kbps to 192kbps)
- **Sampling Rates:** 22kHz, 44.1kHz
- **Real-time Streaming:** Chunked transfer encoding

### ElevenLabs Models
- `eleven_monolingual_v1` - English-only model
- `eleven_multilingual_v1` - Multi-language support
- `eleven_multilingual_v2` - Enhanced multi-language
- `eleven_turbo_v2` - Fast generation
- `eleven_flash_v2` - Ultra-fast generation
- `eleven_turbo_v2_5` - Latest turbo model
- `eleven_flash_v2_5` - Latest flash model
- `eleven_english_sts_v2` - English STS model
- `eleven_multilingual_sts_v2` - Multilingual STS model

### Voice Settings
```typescript
{
  stability: 0.0-1.0,        // Voice consistency
  similarity_boost: 0.0-1.0, // Voice similarity
  style: 0.0-1.0,            // Speaking style
  use_speaker_boost: boolean  // Audio enhancement
}
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/         # API controllers
│   │   ├── VoicesController.ts
│   │   ├── TtsController.ts
│   │   ├── ModelsController.ts
│   │   └── index.ts
│   ├── services/           # Business logic services
│   │   ├── VoicesService.ts
│   │   ├── TtsService.ts
│   │   ├── ModelsService.ts
│   │   ├── FileService.ts
│   │   └── index.ts
│   ├── interfaces/         # TypeScript interfaces
│   │   ├── Voice.interface.ts
│   │   ├── AddVoice.interface.ts
│   │   ├── TextToSpeech.interface.ts
│   │   ├── Models.interface.ts
│   │   └── index.ts
│   ├── types/             # Type definitions
│   │   ├── modelId.ts
│   │   └── index.ts
│   ├── app.module.ts      # Main application module
│   └── main.ts           # Application entry point
├── test/                  # Test files
├── package.json
└── .env
```

## 🛠️ Development Commands

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debugging

# Production
npm run build              # Build the application
npm run start:prod         # Start production server

# Code Quality
npm run lint               # Run ESLint
npm run format            # Format code with Prettier

# Testing
npm run test              # Run unit tests
npm run test:watch        # Run tests in watch mode
npm run test:cov          # Run tests with coverage
npm run test:e2e          # Run end-to-end tests
```

## 🐋 Docker Support
### Docker Compose (with Frontend)
```yaml
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    env_file:
      - ./frontend/.env
    ports:
      - "3000:8080"
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    env_file:
      - ./backend/.env 
    ports:
      - "8080:8080"
```

## 🔐 Security & Best Practices

### API Key Security
- Store API keys in environment variables
- Never commit `.env` files to version control
- Use different keys for development and production
- Implement proper error handling to avoid exposing sensitive data

### Input Validation
- Request body validation using NestJS pipes
- File upload size limits via Multer configuration
- Model ID and output format validation
- Voice ID format validation

### Error Handling
```typescript
// Comprehensive error handling
try {
  const result = await this.elevenLabsOperation()
  return result
} catch (e) {
  if (e instanceof ElevenLabsError) {
    throw new HttpException(e.message, e.statusCode || 500)
  } else if (e instanceof HttpException) {
    throw new HttpException(e.message, e.getStatus())
  } else {
    throw new HttpException(`Unhandled exception: ${e.message}`, 500)
  }
}
```

### TODO: Deployment Options -> Add explanation on GitHub Actions


### API Testing with cURL
```bash
# Test health endpoint
curl http://localhost:8080/api/health

# Test voices endpoint
curl http://localhost:8080/api/voices

# Test models endpoint
curl http://localhost:8080/api/models

# Test TTS conversion
curl -X POST http://localhost:8080/api/tts/convert \
  -H "Content-Type: application/json" \
  -d '{
    "voiceId": "your_voice_id",
    "text": "Hello, world!",
    "modelId": "eleven_multilingual_v2"
  }' \
  --output audio.mp3
```


## 📊 Performance Optimization

### Streaming Benefits
- Reduced memory usage for large audio files
- Faster perceived response times
- Better user experience for long text conversions

### Caching Considerations
TODO: Think about potential caching mechanisms to improve api delivery + CDN use case and necessity.

## 📚 Additional Resources

- [NestJS Documentation](https://nestjs.com/)
- [ElevenLabs API Documentation](https://elevenlabs.io/docs)
- [ElevenLabs Node.js SDK](https://github.com/elevenlabs/elevenlabs-js)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

<div align="center">
  Made with ❤️ and NestJS
</div>