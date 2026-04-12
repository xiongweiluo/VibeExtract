import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import axios from 'axios';
import Anthropic from '@anthropic-ai/sdk';

async function testScreenshotOne() {
  const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY || process.env.SCREENSHOT_ONE_ACCESS_KEY || process.env.SCREENSHOTONE_API_KEY;
  if (!accessKey) {
    console.error('ScreenshotOne access key not found in .env.local. Please set SCREENSHOTONE_ACCESS_KEY or similar.');
    return;
  }

  const url = 'https://api.screenshotone.com/take';
  const params = {
    access_key: accessKey,
    url: 'https://www.google.com',
    viewport_width: 1280,
    viewport_height: 1024,
    image_quality: 80
  };

  try {
    const response = await axios.get(url, { params, responseType: 'arraybuffer' });
    console.log('ScreenshotOne API call successful. Image size:', response.data.length, 'bytes');
  } catch (error) {
    console.error('ScreenshotOne API call failed:', error instanceof Error ? error.message : String(error));
  }
}

async function testClaude() {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    console.error('Anthropic API key not found in .env.local. Please set ANTHROPIC_API_KEY or CLAUDE_API_KEY.');
    return;
  }

  const client = new Anthropic({
    apiKey: apiKey,
  });

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 100,
      messages: [
        { role: 'user', content: 'Hello' }
      ]
    });
    console.log('Claude API call successful. Response:', message.content[0].type === 'text' ? message.content[0].text : 'Non-text response');
  } catch (error) {
    console.error('Claude API call failed:', error instanceof Error ? error.message : String(error));
  }
}

async function main() {
  console.log('Testing APIs...');
  await testScreenshotOne();
  await testClaude();
  console.log('Tests completed.');
}

main();