#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PLUGIN_NAME = 'agy-skills';
const srcDir = path.join(__dirname, 'src');
const targetDir = path.join(os.homedir(), '.gemini', 'config', 'plugins', PLUGIN_NAME);

const args = process.argv.slice(2);
const command = args[0] || 'install';

if (command === 'install') {
  console.log(`🚀 Installing agy-skills to ${targetDir}...`);
  try {
    if (!fs.existsSync(srcDir)) {
      throw new Error(`Source directory 'src' does not exist at ${srcDir}`);
    }

    // 1. Copy local src contents (core skills and metadata)
    fs.mkdirSync(targetDir, { recursive: true });
    fs.cpSync(srcDir, targetDir, { recursive: true, force: true });
    console.log("✅ Installed core skills and metadata configurations.");

    // 2. Fetch external skills dynamically using git clone to a temporary folder
    const tempParentDir = path.join(os.tmpdir(), `agy-skills-temp-${Date.now()}`);
    fs.mkdirSync(tempParentDir, { recursive: true });

    const targetSkillsDir = path.join(targetDir, 'skills');

    try {
      // Clone GoogleChrome/modern-web-guidance
      const mwgTemp = path.join(tempParentDir, 'mwg');
      console.log('📦 Fetching latest modern-web-guidance and chrome-extensions skills from GoogleChrome/modern-web-guidance...');
      execSync(`git clone --depth 1 https://github.com/GoogleChrome/modern-web-guidance.git "${mwgTemp}"`, { stdio: 'ignore' });
      
      fs.cpSync(path.join(mwgTemp, 'skills', 'modern-web-guidance'), path.join(targetSkillsDir, 'modern-web-guidance'), { recursive: true, force: true });
      fs.cpSync(path.join(mwgTemp, 'skills', 'chrome-extensions'), path.join(targetSkillsDir, 'chrome-extensions'), { recursive: true, force: true });

      // Clone vercel-labs/skills
      const vercelTemp = path.join(tempParentDir, 'vercel');
      console.log('📦 Fetching latest find-skills skill from vercel-labs/skills...');
      execSync(`git clone --depth 1 https://github.com/vercel-labs/skills.git "${vercelTemp}"`, { stdio: 'ignore' });

      fs.cpSync(path.join(vercelTemp, 'skills', 'find-skills'), path.join(targetSkillsDir, 'find-skills'), { recursive: true, force: true });

      console.log('✅ Success! Fetched and installed all external skills.');
    } catch (err) {
      console.warn(`⚠️ Warning: Failed to fetch external skills dynamically (${err.message}). Only core skills were installed.`);
    } finally {
      // Cleanup tempParentDir
      fs.rmSync(tempParentDir, { recursive: true, force: true });
    }

    console.log(`\n🎉 Success! Installed all plugin content into ${targetDir}`);
  } catch (error) {
    console.error(`❌ Installation failed: ${error.message}`);
    process.exit(1);
  }
} else if (command === 'uninstall') {
  console.log(`🧹 Uninstalling agy-skills from ${targetDir}...`);
  try {
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
      console.log(`✅ Success! Removed plugin folder from ${targetDir}`);
    } else {
      console.log(`⚠️ Plugin folder does not exist at ${targetDir}`);
    }
  } catch (error) {
    console.error(`❌ Uninstallation failed: ${error.message}`);
    process.exit(1);
  }
} else {
  console.log("Usage: bunx github:meyverick/agy-skills [install|uninstall]");
}