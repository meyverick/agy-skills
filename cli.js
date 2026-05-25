#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PLUGIN_NAME = 'agy-skills';
const srcDir = path.join(__dirname, 'src');
const targetDir = path.join(os.homedir(), '.gemini', 'config', 'plugins', PLUGIN_NAME);

console.log(`🚀 Installing agy-skills to ${targetDir}...`);

try {
  if (!fs.existsSync(srcDir)) {
    throw new Error(`Source directory 'src' does not exist at ${srcDir}`);
  }

  // Create target directory and copy content recursively
  fs.mkdirSync(targetDir, { recursive: true });
  fs.cpSync(srcDir, targetDir, { recursive: true, force: true });

  console.log(`✅ Success! Installed src content into ${targetDir}`);
} catch (error) {
  console.error(`❌ Installation failed: ${error.message}`);
  process.exit(1);
}