/**
 * Tool: ytdlp-wrapper
 * Description: Wrapper para executar o yt-dlp e baixar vídeos.
 * Implementation: Uses native child_process to avoid external dependencies.
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const util = require('util');

// Promisify exec for async/await usage
const execPromise = util.promisify(exec);

async function downloadVideo({ url, format = 'best', outputDir = './downloads' }) {
  if (!url) {
    throw new Error('URL is required for video download.');
  }

  // Ensure output directory exists
  const absoluteOutputDir = path.resolve(process.cwd(), outputDir);
  if (!fs.existsSync(absoluteOutputDir)) {
    fs.mkdirSync(absoluteOutputDir, { recursive: true });
  }

  console.log(`Starting download for: ${url}`);
  console.log(`Output directory: ${absoluteOutputDir}`);

  try {
    // Construct command string for child_process.exec
    // Note: We need to be careful with shell escaping in a real production env,
    // but for this controlled tool usage, basic quoting helps.

    // Output template: outputDir/Title.Extension
    const outputTemplate = path.join(absoluteOutputDir, '%(title)s.%(ext)s');

    // Check for local binary first
    const localBinary = path.join(__dirname, '..', 'bin', 'yt-dlp-new.exe');
    const binaryPath = fs.existsSync(localBinary) ? `"${localBinary}"` : 'yt-dlp';

    // Command: binary "URL" -f format -o "template" --no-playlist
    const command = `${binaryPath} "${url}" -f "${format}" -o "${outputTemplate}" --no-playlist`;

    console.log(`Executing: ${command}`);

    const { stdout, stderr } = await execPromise(command);

    if (stderr) {
      console.warn('yt-dlp stderr output:', stderr);
    }

    return {
      success: true,
      message: 'Download completed successfully.',
      output: stdout,
      directory: absoluteOutputDir
    };

  } catch (error) {
    // Check if error seems to be related to missing executable
    if (error.message && (error.message.includes('not found') || error.message.includes('not recognized'))) {
      throw new Error('yt-dlp executable not found. Please ensure yt-dlp is installed and in your PATH.');
    }

    throw new Error(`Download failed: ${error.message}`);
  }
}

// Export for AIOS tool system
module.exports = {
  name: 'ytdlp-wrapper',
  description: 'Download videos using yt-dlp',
  parameters: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'The URL of the video to download'
      },
      format: {
        type: 'string',
        description: 'Video format (default: best)',
        default: 'best'
      },
      outputDir: {
        type: 'string',
        description: 'Directory to save the video',
        default: './downloads'
      }
    },
    required: ['url']
  },
  execute: downloadVideo
};
