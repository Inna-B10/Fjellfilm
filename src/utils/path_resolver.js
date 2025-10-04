import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
export const srcDir = resolve(dirname(__filename), '..')
export const rootDir = resolve(srcDir, '..')
