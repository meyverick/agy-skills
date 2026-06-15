#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = __dirname;
const targetDir = path.join(os.homedir(), '.gemini');
const targetSkillsDir = path.join(targetDir, 'skills');

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
    'ai-referencing-optimization',
    'project-documentation-mastery'
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
    'find-skills',
    'svelte-code-writer',
    'svelte-core-bestpractices'
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
    const fetchSvelte = skillsToFetch.includes('svelte-code-writer') || skillsToFetch.includes('svelte-core-bestpractices');

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

    if (fetchSvelte) {
      const svelteTemp = path.join(tempParentDir, 'svelte');
      console.log('📦 Fetching latest svelte skills from sveltejs/ai-tools...');
      execSync(`git clone --depth 1 https://github.com/sveltejs/ai-tools.git "${svelteTemp}"`, { stdio: 'ignore' });
      if (skillsToFetch.includes('svelte-code-writer')) {
        fs.cpSync(path.join(svelteTemp, 'tools', 'skills', 'svelte-code-writer'), path.join(targetSkillsDir, 'svelte-code-writer'), { recursive: true, force: true });
      }
      if (skillsToFetch.includes('svelte-core-bestpractices')) {
        fs.cpSync(path.join(svelteTemp, 'tools', 'skills', 'svelte-core-bestpractices'), path.join(targetSkillsDir, 'svelte-core-bestpractices'), { recursive: true, force: true });
      }
    }
  } catch (err) {
    console.warn(`⚠️ Warning: Failed to fetch external skills dynamically (${err.message}).`);
  } finally {
    fs.rmSync(tempParentDir, { recursive: true, force: true });
  }
}

function checkUpdates() {
  let updatesAvailable = [];

  const geminiSrc = path.join(srcDir, 'GEMINI.md');
  const geminiTarget = path.join(targetDir, 'GEMINI.md');
  if (fs.existsSync(geminiSrc)) {
    if (!fs.existsSync(geminiTarget) || fs.readFileSync(geminiSrc).toString() !== fs.readFileSync(geminiTarget).toString()) {
      updatesAvailable.push('GEMINI.md');
    }
  }

  const hooksSrc = path.join(srcDir, 'hooks.json');
  const hooksTarget = path.join(targetDir, 'hooks.json');
  if (fs.existsSync(hooksSrc)) {
    if (!fs.existsSync(hooksTarget)) {
      updatesAvailable.push('hooks.json');
    } else {
      try {
        const srcJson = JSON.parse(fs.readFileSync(hooksSrc, 'utf8'));
        const targetJson = JSON.parse(fs.readFileSync(hooksTarget, 'utf8'));
        for (const key of Object.keys(srcJson)) {
          if (JSON.stringify(srcJson[key]) !== JSON.stringify(targetJson[key])) {
            updatesAvailable.push(`hooks.json (${key})`);
            break;
          }
        }
      } catch (err) {
        updatesAvailable.push('hooks.json');
      }
    }
  }

  const srcSkillsDir = path.join(srcDir, 'skills');
  const existingSkills = fs.existsSync(targetSkillsDir) ? fs.readdirSync(targetSkillsDir) : [];
  const externalSkills = ['modern-web-guidance', 'chrome-extensions', 'find-skills', 'svelte-code-writer', 'svelte-core-bestpractices'];
  const externalToCheck = [];

  for (const skill of existingSkills) {
    const srcSkillPath = path.join(srcSkillsDir, skill);
    const targetSkillPath = path.join(targetSkillsDir, skill);
    if (fs.existsSync(srcSkillPath)) {
      if (areDirsDifferent(srcSkillPath, targetSkillPath)) {
        updatesAvailable.push(`skill: ${skill}`);
      }
    } else if (externalSkills.includes(skill)) {
      externalToCheck.push(skill);
    }
  }

  if (externalToCheck.length > 0) {
    const tempParentDir = path.join(os.tmpdir(), `agy-skills-check-${Date.now()}`);
    fs.mkdirSync(tempParentDir, { recursive: true });
    try {
      const fetchMwg = externalToCheck.includes('modern-web-guidance') || externalToCheck.includes('chrome-extensions');
      const fetchFindSkills = externalToCheck.includes('find-skills');
      const fetchSvelte = externalToCheck.includes('svelte-code-writer') || externalToCheck.includes('svelte-core-bestpractices');

      if (fetchMwg) {
        const mwgTemp = path.join(tempParentDir, 'mwg');
        execSync(`git clone --depth 1 https://github.com/GoogleChrome/modern-web-guidance.git "${mwgTemp}"`, { stdio: 'ignore' });
        if (externalToCheck.includes('modern-web-guidance') && areDirsDifferent(path.join(mwgTemp, 'skills', 'modern-web-guidance'), path.join(targetSkillsDir, 'modern-web-guidance'))) {
          updatesAvailable.push('skill: modern-web-guidance');
        }
        if (externalToCheck.includes('chrome-extensions') && areDirsDifferent(path.join(mwgTemp, 'skills', 'chrome-extensions'), path.join(targetSkillsDir, 'chrome-extensions'))) {
          updatesAvailable.push('skill: chrome-extensions');
        }
      }

      if (fetchFindSkills) {
        const vercelTemp = path.join(tempParentDir, 'vercel');
        execSync(`git clone --depth 1 https://github.com/vercel-labs/skills.git "${vercelTemp}"`, { stdio: 'ignore' });
        if (areDirsDifferent(path.join(vercelTemp, 'skills', 'find-skills'), path.join(targetSkillsDir, 'find-skills'))) {
          updatesAvailable.push('skill: find-skills');
        }
      }

      if (fetchSvelte) {
        const svelteTemp = path.join(tempParentDir, 'svelte');
        execSync(`git clone --depth 1 https://github.com/sveltejs/ai-tools.git "${svelteTemp}"`, { stdio: 'ignore' });
        if (externalToCheck.includes('svelte-code-writer') && areDirsDifferent(path.join(svelteTemp, 'tools', 'skills', 'svelte-code-writer'), path.join(targetSkillsDir, 'svelte-code-writer'))) {
          updatesAvailable.push('skill: svelte-code-writer');
        }
        if (externalToCheck.includes('svelte-core-bestpractices') && areDirsDifferent(path.join(svelteTemp, 'tools', 'skills', 'svelte-core-bestpractices'), path.join(targetSkillsDir, 'svelte-core-bestpractices'))) {
          updatesAvailable.push('skill: svelte-core-bestpractices');
        }
      }
    } catch (err) {
      // ignore
    } finally {
      fs.rmSync(tempParentDir, { recursive: true, force: true });
    }
  }

  if (updatesAvailable.length > 0) {
    console.log(`\n⚠️  [agy-skills] Updates are available for your installed skills/rules.`);
    console.log(`Run 'bunx github:meyverick/agy-skills update' to apply them.\n`);
  }
}

function mergeHooks(srcPath, targetPath) {
  if (!fs.existsSync(srcPath)) return;
  if (!fs.existsSync(targetPath)) {
    fs.copyFileSync(srcPath, targetPath);
    return;
  }
  try {
    const srcJson = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
    const targetJson = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    Object.assign(targetJson, srcJson);
    fs.writeFileSync(targetPath, JSON.stringify(targetJson, null, 2), 'utf8');
  } catch (err) {
    // If target is invalid JSON, overwrite it
    fs.copyFileSync(srcPath, targetPath);
  }
}

function syncSkills(requestedSkills = null, isUpdateMode = false) {
  const srcSkillsDir = path.join(srcDir, 'skills');

  // Ensure target directories exist
  fs.mkdirSync(targetDir, { recursive: true });
  fs.mkdirSync(targetSkillsDir, { recursive: true });

  // Install GEMINI.md
  const geminiSrc = path.join(srcDir, 'GEMINI.md');
  const geminiTarget = path.join(targetDir, 'GEMINI.md');
  if (fs.existsSync(geminiSrc)) {
    fs.copyFileSync(geminiSrc, geminiTarget);
  }

  // Install hooks.json
  const hooksSrc = path.join(srcDir, 'hooks.json');
  const hooksTarget = path.join(targetDir, 'hooks.json');
  if (fs.existsSync(hooksSrc)) {
    mergeHooks(hooksSrc, hooksTarget);
  }

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
    console.log("✨ Rules and hooks installed. Run with --skills=group1,group2 to install specific skills.");
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
  console.log(`⚠️  [agy-skills] Notice: This project is not configured as an Antigravity plugin due to current instability in the plugin loader. It will perform a global custom installation, replacing your existing global GEMINI.md.`);
  
  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const confirm = () => new Promise((resolve) => {
    rl.question('Do you want to proceed with the installation? (y/N): ', (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });

  const answer = await confirm();
  if (answer !== 'y' && answer !== 'yes') {
    console.log('❌ Installation aborted by user.');
    process.exit(0);
  }

  console.log(`🚀 Installing agy-skills to ${targetDir}...`);
  try {
    syncSkills(requestedSkills);
    console.log(`\n🎉 Success! Custom installation completed in ${targetDir}`);
  } catch (error) {
    console.error(`❌ Installation failed: ${error.message}`);
    process.exit(1);
  }
} else if (command === 'uninstall') {
  console.log(`🧹 Uninstalling agy-skills from ${targetDir}...`);
  try {
    const geminiTarget = path.join(targetDir, 'GEMINI.md');
    if (fs.existsSync(geminiTarget)) {
      fs.rmSync(geminiTarget, { force: true });
    }
    // Remove individual keys from target hooks.json if it exists
    const hooksSrc = path.join(srcDir, 'hooks.json');
    const hooksTarget = path.join(targetDir, 'hooks.json');
    if (fs.existsSync(hooksSrc) && fs.existsSync(hooksTarget)) {
      try {
        const srcJson = JSON.parse(fs.readFileSync(hooksSrc, 'utf8'));
        const targetJson = JSON.parse(fs.readFileSync(hooksTarget, 'utf8'));
        for (const key of Object.keys(srcJson)) {
          delete targetJson[key];
        }
        if (Object.keys(targetJson).length === 0) {
          fs.rmSync(hooksTarget, { force: true });
        } else {
          fs.writeFileSync(hooksTarget, JSON.stringify(targetJson, null, 2), 'utf8');
        }
      } catch (err) {
        // ignore
      }
    }
    if (fs.existsSync(targetSkillsDir)) {
      fs.rmSync(targetSkillsDir, { recursive: true, force: true });
    }
    console.log("✅ Success! Custom installation removed.");
  } catch (error) {
    console.error(`❌ Uninstallation failed: ${error.message}`);
    process.exit(1);
  }
} else if (command === 'update') {
  console.log(`🚀 Updating existing agy-skills in ${targetDir}...`);
  try {
    syncSkills(null, true);
    console.log(`\n🎉 Success! Custom installation updated in ${targetDir}`);
  } catch (error) {
    console.error(`❌ Update failed: ${error.message}`);
    process.exit(1);
  }
} else if (command === 'check') {
  try {
    checkUpdates();
  } catch (error) {
    // silently fail check
  }
} else {
  console.log("Usage: bunx github:meyverick/agy-skills [install|update|uninstall|check]");
}