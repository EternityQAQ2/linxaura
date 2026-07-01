/**
 * Copy zeroperl.wasm from node_modules to the Vite build output.
 *
 * The @uswriting/exiftool package depends on @6over3/zeroperl-ts which
 * ships a 25MB zeroperl.wasm binary. Vite does not automatically bundle
 * WASM files referenced via plain fetch() calls in third-party dependencies,
 * so we copy it explicitly after each build.
 */
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import process from 'node:process'

const webAppDir = process.cwd()
const webRequire = createRequire(join(webAppDir, 'noop.mjs'))

// Resolve the zeroperl WASM through @uswriting/exiftool's module context,
// since @6over3/zeroperl-ts is a dependency of exiftool and not directly hoisted.
const exiftoolDir = dirname(webRequire.resolve('@uswriting/exiftool'))
const exiftoolRequire = createRequire(join(exiftoolDir, 'noop.mjs'))
const wasmPath = exiftoolRequire.resolve('@6over3/zeroperl-ts/zeroperl.wasm')
const destDir = join(webAppDir, 'dist/assets')
const dest = join(destDir, 'zeroperl.wasm')

if (!existsSync(wasmPath)) {
  console.error(`zeroperl.wasm not found at: ${wasmPath}`)
  process.exit(1)
}

if (!existsSync(destDir)) {
  mkdirSync(destDir, { recursive: true })
}

copyFileSync(wasmPath, dest)
console.log(`Copied zeroperl.wasm to dist/assets/ (${(existsSync(dest) ? 'OK' : 'FAILED')})`)
