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

function getFilesRecursive(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursive(filePath).map(f => path.join(file, f)));
    } else {
      results.push(file);
    }
  });
  return results;
}

function areDirsDifferent(dirA, dirB) {
  const filesA = getFilesRecursive(dirA).sort();
  const filesB = getFilesRecursive(dirB).sort();
  if (filesA.length !== filesB.length) return true;
  for (let i = 0; i < filesA.length; i++) {
    if (filesA[i] !== filesB[i]) return true;
    const fileA = path.join(dirA, filesA[i]);
    const fileB = path.join(dirB, filesB[i]);
    const statA = fs.statSync(fileA);
    const statB = fs.statSync(fileB);
    if (statA.size !== statB.size) return true;
    if (fs.readFileSync(fileA).toString() !== fs.readFileSync(fileB).toString()) return true;
  }
  return false;
}

function syncSkills(srcDir, targetDir) {
  const srcSkillsDir = path.join(srcDir, 'skills');
  const targetSkillsDir = path.join(targetDir, 'skills');

  // Ensure target directories exist
  fs.mkdirSync(targetDir, { recursive: true });
  fs.mkdirSync(targetSkillsDir, { recursive: true });

  // Clean any top-level orphaned files/folders in targetDir except allowed ones
  const allowedTopLevel = ['plugin.json', 'rules', 'skills'];
  if (fs.existsSync(targetDir)) {
    const topLevel = fs.readdirSync(targetDir);
    for (const item of topLevel) {
      if (!allowedTopLevel.includes(item)) {
        fs.rmSync(path.join(targetDir, item), { recursive: true, force: true });
      }
    }
  }

  // Copy/overwrite non-skills assets (plugin.json and rules)
  fs.cpSync(path.join(srcDir, 'plugin.json'), path.join(targetDir, 'plugin.json'), { force: true });
  fs.cpSync(path.join(srcDir, 'rules'), path.join(targetDir, 'rules'), { recursive: true, force: true });

  const localSkills = fs.existsSync(srcSkillsDir) ? fs.readdirSync(srcSkillsDir) : [];
  const existingSkills = fs.existsSync(targetSkillsDir) ? fs.readdirSync(targetSkillsDir) : [];

  const added = [];
  const updated = [];
  const removed = [];
  const externalSkills = ['modern-web-guidance', 'chrome-extensions', 'find-skills'];

  // Process removals
  for (const skill of existingSkills) {
    const isLocal = localSkills.includes(skill);
    const isExternal = externalSkills.includes(skill);
    if (!isLocal && !isExternal) {
      fs.rmSync(path.join(targetSkillsDir, skill), { recursive: true, force: true });
      removed.push(skill);
    }
  }

  // Process additions and updates
  for (const skill of localSkills) {
    const srcSkillPath = path.join(srcSkillsDir, skill);
    const targetSkillPath = path.join(targetSkillsDir, skill);

    if (!existingSkills.includes(skill)) {
      fs.cpSync(srcSkillPath, targetSkillPath, { recursive: true, force: true });
      added.push(skill);
    } else {
      if (areDirsDifferent(srcSkillPath, targetSkillPath)) {
        fs.cpSync(srcSkillPath, targetSkillPath, { recursive: true, force: true });
        updated.push(skill);
      }
    }
  }

  // Print results
  if (added.length > 0) {
    console.log(`➕ Added skills (${added.length}):`);
    added.forEach(s => console.log(`   - ${s}`));
  }
  if (updated.length > 0) {
    console.log(`🔄 Updated skills (${updated.length}):`);
    updated.forEach(s => console.log(`   - ${s}`));
  }
  if (removed.length > 0) {
    console.log(`➖ Removed skills (${removed.length}):`);
    removed.forEach(s => console.log(`   - ${s}`));
  }
  if (added.length === 0 && updated.length === 0 && removed.length === 0) {
    console.log("✨ All skills are already up to date.");
  }
}

const args = process.argv.slice(2);
const command = args[0] || 'install';

if (command === 'install') {
  console.log(`🚀 Installing agy-skills to ${targetDir}...`);
  try {
    if (!fs.existsSync(srcDir)) {
      throw new Error(`Source directory 'src' does not exist at ${srcDir}`);
    }

    // Sync skills and metadata
    syncSkills(srcDir, targetDir);

    console.log(`\n🎉 Success! Synchronized all core plugin content in ${targetDir}`);
    console.log("💡 Tip: To install extra external skills (modern-web-guidance, chrome-extensions, find-skills), run:");
    console.log("   bunx github:meyverick/agy-skills extra");
  } catch (error) {
    console.error(`❌ Installation failed: ${error.message}`);
    process.exit(1);
  }
} else if (command === 'extra') {
  console.log(`🚀 Installing agy-skills with extra external skills to ${targetDir}...`);
  try {
    if (!fs.existsSync(srcDir)) {
      throw new Error(`Source directory 'src' does not exist at ${srcDir}`);
    }

    // 1. Sync local src contents (core skills and metadata)
    syncSkills(srcDir, targetDir);

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
      console.warn(`⚠️ Warning: Failed to fetch external skills dynamically (${err.message}).`);
    } finally {
      // Cleanup tempParentDir
      fs.rmSync(tempParentDir, { recursive: true, force: true });
    }

    console.log(`\n🎉 Success! Installed all plugin and extra content into ${targetDir}`);
  } catch (error) {
    console.error(`❌ Installation failed: ${error.message}`);
    process.exit(1);
  }
} else if (command === 'uninstall') {
  console.log(`🧹 Uninstalling agy-skills from ${targetDir}...`);
  try {
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
      console.log("✅ Success! Removed plugin folder from target directory.");
    } else {
      console.log(`⚠️ Plugin folder does not exist at ${targetDir}`);
    }
  } catch (error) {
    console.error(`❌ Uninstallation failed: ${error.message}`);
    process.exit(1);
  }
} else {
  console.log("Usage: bunx github:meyverick/agy-skills [install|uninstall|extra]");
}