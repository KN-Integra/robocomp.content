#!/usr/bin/env node
'use strict';

/**
 * update-lastmod.js
 *
 * Cross-platform Node.js script (no extra dependencies required) that updates
 * the `lastmod` front-matter field in Markdown content files to the current
 * UTC timestamp.
 *
 * Usage:
 *   node scripts/update-lastmod.js              # update all staged content/ files (pre-commit mode)
 *   node scripts/update-lastmod.js --all        # update all git-tracked modified files in content/
 *   node scripts/update-lastmod.js <file> ...   # update specific files
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ISO-8601 UTC timestamp without milliseconds, e.g. "2025-03-20T09:40:42Z"
const now = new Date();
const timestamp =
  now.getUTCFullYear() +
  '-' + String(now.getUTCMonth() + 1).padStart(2, '0') +
  '-' + String(now.getUTCDate()).padStart(2, '0') +
  'T' + String(now.getUTCHours()).padStart(2, '0') +
  ':' + String(now.getUTCMinutes()).padStart(2, '0') +
  ':' + String(now.getUTCSeconds()).padStart(2, '0') +
  'Z';

/**
 * Replace the value of an existing `lastmod:` key in YAML front-matter.
 * Handles both LF and CRLF line endings.
 *
 * @param {string} filePath
 */
function updateLastmod(filePath) {
  const absPath = path.resolve(filePath);

  if (!fs.existsSync(absPath)) {
    console.warn(`Skipping (file not found): ${filePath}`);
    return;
  }

  const original = fs.readFileSync(absPath, 'utf8');

  // Match `lastmod:` followed by any value on the same line
  const updated = original.replace(
    /^(lastmod:\s*).*$/m,
    `$1${timestamp}`
  );

  if (updated === original) {
    console.log(`No lastmod field found, skipping: ${filePath}`);
    return;
  }

  fs.writeFileSync(absPath, updated, 'utf8');
  console.log(`Updated lastmod in: ${filePath}`);
}

/**
 * Run a git command and return trimmed stdout.
 * Returns an empty string on error instead of throwing.
 *
 * @param {string} cmd
 * @returns {string}
 */
function git(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

// ── Resolve the list of files to process ────────────────────────────────────

const args = process.argv.slice(2);

let files;

if (args.length > 0 && args[0] === '--all') {
  // All git-tracked files in content/ that have uncommitted modifications
  const output = git('git diff --name-only --diff-filter=ACM -- content/');
  files = output ? output.split(/\r?\n/).filter(Boolean) : [];
} else if (args.length > 0) {
  // Explicit file list passed as arguments
  files = args;
} else {
  // Default: staged files in content/ (suitable for use as a git pre-commit hook)
  const output = git('git diff --cached --name-only --diff-filter=ACM -- content/');
  files = output ? output.split(/\r?\n/).filter(Boolean) : [];
}

if (files.length === 0) {
  console.log('No content files to update.');
  process.exit(0);
}

// ── Update each file ─────────────────────────────────────────────────────────

files.forEach(updateLastmod);

// ── Re-stage updated files when running in pre-commit mode ───────────────────

if (args.length === 0) {
  const result = git('git add --all');
  if (result !== '') {
    console.error('Warning: git add returned unexpected output:', result);
  }
}

console.log('Done! 🎉');
