# Audio Optimization Guide

## Current Issues

### Large Audio File: stasis.mp3 (3.0MB)
The main background audio file is significantly impacting page load performance.

## Recommended Optimizations

### 1. Compress stasis.mp3
Current: 3.0MB → Target: ~900KB-1.2MB (60-70% reduction)

#### Compression Settings:
- **Bitrate**: 128kbps (down from likely 320kbps)
- **Sample Rate**: 44.1kHz
- **Format**: Keep MP3 for compatibility, add WebM/Opus alternatives

#### Tools for Compression:
```bash
# Using FFmpeg for compression
ffmpeg -i stasis.mp3 -b:a 128k -ar 44100 stasis-optimized.mp3

# Create WebM/Opus version (smaller file size)
ffmpeg -i stasis.mp3 -c:a libopus -b:a 96k stasis.webm

# Create OGG/Opus version (fallback)
ffmpeg -i stasis.mp3 -c:a libopus -b:a 96k stasis.ogg
```

### 2. Multiple Format Support
Implement format detection to serve the best supported format:

```typescript
// Example implementation
const audioFormats = [
  { src: '/audio/stasis.webm', type: 'audio/webm; codecs=opus' },
  { src: '/audio/stasis.ogg', type: 'audio/ogg; codecs=opus' },
  { src: '/audio/stasis.mp3', type: 'audio/mpeg' }
];
```

### 3. Progressive Loading
- **Current**: Full file loaded on page load
- **Optimized**: Metadata preload → Stream on play

### 4. Lazy Loading Strategy
- Load audio metadata on component mount
- Start downloading audio file only when user interaction is detected
- Show loading states during audio preparation

## Implementation Status

✅ **Completed**:
- Changed preload strategy from 'auto' to 'metadata'
- Added streaming support with crossOrigin
- Created audio optimization utilities

🔄 **Next Steps**:
1. Compress stasis.mp3 using recommended settings
2. Create multiple format versions (WebM, OGG)
3. Update AudioEnabler to use progressive loading
4. Test audio loading performance

## Expected Performance Impact

- **Initial page load**: 3MB reduction in transferred data
- **Time to interactive**: 2-4 seconds faster on slow connections
- **Bandwidth savings**: 60-70% for audio resources
- **User experience**: Faster page loads, smoother audio transitions

## Browser Compatibility

| Format | Chrome | Firefox | Safari | Edge |
|--------|---------|---------|---------|------|
| MP3    | ✅      | ✅       | ✅      | ✅    |
| WebM   | ✅      | ✅       | ❌      | ✅    |
| OGG    | ✅      | ✅       | ❌      | ✅    |

*WebM/OGG provide better compression but MP3 fallback ensures Safari compatibility.*