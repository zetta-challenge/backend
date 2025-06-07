## 📝 API Endpoints

### 🎵 Voice Management

#### Get All Voices
```http
GET /api/voices
```
**Response:**
```json
[
  {
    "voiceId": "string",
    "name": "string"
  }
]
```

#### Create Voice
```http
POST /api/voices
Content-Type: multipart/form-data
```
**Body:**
- `files`: Audio files (multipart)
- `name`: Voice name (string)
- `removeBackgroundNoise`: Remove background noise (boolean)

#### Delete Voice
```http
DELETE /api/voices
Content-Type: application/json
```
**Body:**
```json
{
  "voiceId": "string"
}
```

### 🤖 Model Information

#### Get All Models
```http
GET /api/models
```
**Response:**
```json
[
  {
    "modelId": "string",
    "name": "string",
    "description": "string",
    "canDoTTS": boolean,
    "canDoVoiceConversion": boolean,
    "tokenCostFactor": number,
    "maxCharReqFreeUser": number,
    "maxCharReqSubscribedUser": number,
    "maximumTextLengthPerRequest": number,
    "languages": [
      {
        "languageId": "string",
        "name": "string"
      }
    ]
  }
]
```

### 🔊 Text-to-Speech

#### Convert Text to Speech
```http
POST /api/tts/convert
Content-Type: application/json
Content-Type: audio/mpeg
```
**Body:**
```json
{
  "voiceId": "string",
  "text": "string",
  "outputFormat": "mp3_44100_128",
  "modelId": "eleven_multilingual_v2",
  "languageCode": "en",
  "voiceSettings": {
    "stability": 0.5,
    "similarity_boost": 0.5,
    "style": 0.0,
    "use_speaker_boost": true
  },
  "previousText": "string",
  "nextText": "string",
  "applyTextNormalization": "auto"
}
```

#### Stream Text to Speech
```http
POST /api/tts/stream
Content-Type: application/json
```
**Body:** Same as convert endpoint
**Response:** Streamed audio data

#### Convert with Timestamps
```http
POST /api/tts/convert-timestamps
Content-Type: application/json
```

#### Stream with Timestamps
```http
POST /api/tts/stream-timestamps
Content-Type: application/json
```

### Health Check Endpoint
```http
GET /api/health
```
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345
}
```