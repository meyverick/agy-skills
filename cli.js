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

const SKILL_GROUPS = {
  core: [
    'architectural-alignment-validation',
    'cloud-native-infrastructure-optimization',
    'quality-assurance-and-observability-validation',
    'resilience-and-security-auditing',
    'workspace-refactoring',
    'secure-gitignore-management',
    'pnpm-workspace-management',
    'bug-resolution-reporting',
    'markdown-formatting-mastery',
    'ai-referencing-optimization'
  ],
  web: [
    'svelte-ui-engineering',
    'svelte-game-development',
    'sveltekit-fullstack-architecture',
    'fs-sveltekit-init',
    'vite-build-optimization',
    'tanstack-query-architecture',
    'svg-emote-generation',
    'virtual-avatar-engineering'
  ],
  backend: [
    'rust-systems-programming',
    'tokio-async-architecture',
    'tauri-desktop-engineering',
    'encore-ts-backend-engineering',
    'colyseus-multiplayer-development',
    'pinus-server-development',
    'caprover-cli-deployment'
  ],
  gamedev: [
    'unity-ads-integration',
    'unity-burst-optimization',
    'unity-csharp-memory-stripping',
    'unity-dots-programming',
    'unity-javascript-bridge-integration',
    'unity-webgl-pruning',
    'harmony-patching-mastery',
    'cocos-playbuild-integration',
    'oops-framework-development',
    'esengine-integration',
    'biteecs-optimization',
    'fairygui-integration',
    'pixijs-2d-rendering'
  ],
  adtech: [
    'playable-ad-design-research',
    'playable-ad-packaging',
    'playable-ad-telemetry',
    'html5-game-migration',
    'monetization-sdk-integration',
    'mraid-ad-integration',
    'lightweight-analytics-integration'
  ],
  extra: [
    'modern-web-guidance',
    'chrome-extensions',
    'find-skills'
  ]
};

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

function fetchExternalSkills(skillsToFetch, targetSkillsDir) {
  if (skillsToFetch.length === 0) return;
  const tempParentDir = path.join(os.tmpdir(), `agy-skills-temp-${Date.now()}`);
  fs.mkdirSync(tempParentDir, { recursive: true });
  try {
    const fetchMwg = skillsToFetch.includes('modern-web-guidance') || skillsToFetch.includes('chrome-extensions');
    const fetchFindSkills = skillsToFetch.includes('find-skills');

    if (fetchMwg) {
      const mwgTemp = path.join(tempParentDir, 'mwg');
      console.log('📦 Fetching latest modern-web-guidance and chrome-extensions skills from GoogleChrome/modern-web-guidance...');
      execSync(`git clone --depth 1 https://github.com/GoogleChrome/modern-web-guidance.git "${mwgTemp}"`, { stdio: 'ignore' });
      if (skillsToFetch.includes('modern-web-guidance')) {
        fs.cpSync(path.join(mwgTemp, 'skills', 'modern-web-guidance'), path.join(targetSkillsDir, 'modern-web-guidance'), { recursive: true, force: true });
      }
      if (skillsToFetch.includes('chrome-extensions')) {
        fs.cpSync(path.join(mwgTemp, 'skills', 'chrome-extensions'), path.join(targetSkillsDir, 'chrome-extensions'), { recursive: true, force: true });
      }
    }

    if (fetchFindSkills) {
      const vercelTemp = path.join(tempParentDir, 'vercel');
      console.log('📦 Fetching latest find-skills skill from vercel-labs/skills...');
      execSync(`git clone --depth 1 https://github.com/vercel-labs/skills.git "${vercelTemp}"`, { stdio: 'ignore' });
      fs.cpSync(path.join(vercelTemp, 'skills', 'find-skills'), path.join(targetSkillsDir, 'find-skills'), { recursive: true, force: true });
    }
  } catch (err) {
    console.warn(`⚠️ Warning: Failed to fetch external skills dynamically (${err.message}).`);
  } finally {
    fs.rmSync(tempParentDir, { recursive: true, force: true });
  }
}

function syncSkills(srcDir, targetDir, requestedSkills = null, isUpdateMode = false) {
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

  const existingSkills = fs.existsSync(targetSkillsDir) ? fs.readdirSync(targetSkillsDir) : [];
  const externalSkills = ['modern-web-guidance', 'chrome-extensions', 'find-skills'];

  if (isUpdateMode) {
    const updated = [];
    const externalToUpdate = [];

    for (const skill of existingSkills) {
      const srcSkillPath = path.join(srcSkillsDir, skill);
      const targetSkillPath = path.join(targetSkillsDir, skill);
      if (fs.existsSync(srcSkillPath)) {
        if (areDirsDifferent(srcSkillPath, targetSkillPath)) {
          fs.cpSync(srcSkillPath, targetSkillPath, { recursive: true, force: true });
          updated.push(skill);
        }
      } else if (externalSkills.includes(skill)) {
        externalToUpdate.push(skill);
      }
    }

    if (externalToUpdate.length > 0) {
      fetchExternalSkills(externalToUpdate, targetSkillsDir);
      updated.push(...externalToUpdate);
    }

    if (updated.length > 0) {
      console.log(`🔄 Updated existing skills (${updated.length}):`);
      updated.forEach(s => console.log(`   - ${s}`));
    } else {
      console.log("✨ All existing skills are already up to date.");
    }
    return;
  }

  if (requestedSkills === null) {
    console.log("✨ Rules installed. Run with --skills=group1,group2 to install specific skills.");
    return;
  }

  const allLocalSkills = fs.existsSync(srcSkillsDir) ? fs.readdirSync(srcSkillsDir) : [];
  let localSkills = [];
  let desiredExternalSkills = [];

  if (requestedSkills.includes('all')) {
    localSkills = allLocalSkills;
    desiredExternalSkills = [...externalSkills];
  } else {
    const requestedSet = new Set();
    for (const req of requestedSkills) {
      if (SKILL_GROUPS[req]) {
        SKILL_GROUPS[req].forEach(s => requestedSet.add(s));
      } else {
        requestedSet.add(req);
      }
    }
    localSkills = allLocalSkills.filter(s => requestedSet.has(s));
    desiredExternalSkills = externalSkills.filter(s => requestedSet.has(s));
  }

  const added = [];
  const updated = [];
  const removed = [];

  // Process removals
  for (const skill of existingSkills) {
    const isLocal = localSkills.includes(skill);
    const isExternal = desiredExternalSkills.includes(skill);
    if (!isLocal && !isExternal) {
      fs.rmSync(path.join(targetSkillsDir, skill), { recursive: true, force: true });
      removed.push(skill);
    }
  }

  // Process additions and updates for local skills
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

  // Process additions and updates for external skills
  const externalToAddOrUpdate = [];
  for (const skill of desiredExternalSkills) {
    if (!existingSkills.includes(skill)) {
      externalToAddOrUpdate.push(skill);
      added.push(skill);
    } else {
      externalToAddOrUpdate.push(skill);
      updated.push(skill);
    }
  }

  if (externalToAddOrUpdate.length > 0) {
    fetchExternalSkills(externalToAddOrUpdate, targetSkillsDir);
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
const command = args[0] && !args[0].startsWith('--') ? args[0] : 'install';

let requestedSkills = null;
const skillsArg = args.find(a => a.startsWith('--skills='));
if (skillsArg) {
  requestedSkills = skillsArg.split('=')[1].split(',').map(s => s.trim());
}

if (command === 'install') {
  console.log(`🚀 Installing agy-skills to ${targetDir}...`);
  try {
    if (!fs.existsSync(srcDir)) {
      throw new Error(`Source directory 'src' does not exist at ${srcDir}`);
    }

    // Sync skills and metadata
    syncSkills(srcDir, targetDir, requestedSkills);

    console.log(`\n🎉 Success! Synchronized all core plugin content in ${targetDir}`);
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
} else if (command === 'update') {
  console.log(`🚀 Updating existing agy-skills in ${targetDir}...`);
  try {
    if (!fs.existsSync(srcDir)) {
      throw new Error(`Source directory 'src' does not exist at ${srcDir}`);
    }

    // Sync skills in update mode
    syncSkills(srcDir, targetDir, null, true);

    console.log(`\n🎉 Success! Updated all existing plugin content in ${targetDir}`);
  } catch (error) {
    console.error(`❌ Update failed: ${error.message}`);
    process.exit(1);
  }
} else {
  console.log("Usage: bunx github:meyverick/agy-skills [install|update|uninstall]");
}