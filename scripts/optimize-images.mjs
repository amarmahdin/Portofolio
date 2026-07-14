import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ASSETS_DIR = path.join(__dirname, '../src/assets')
const MAX_BYTES = 200 * 1024
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg'])

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase()
  const baseName = path.basename(inputPath, ext)
  const outputPath = path.join(ASSETS_DIR, `${baseName}.webp`)

  const metadata = await sharp(inputPath).metadata()
  let width = metadata.width ?? 1400
  let quality = 82

  if (width > 1400) width = 1400

  let buffer = null
  let attempts = 0

  while (attempts < 40) {
    attempts += 1
    buffer = await sharp(inputPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer()

    if (buffer.length <= MAX_BYTES) break

    if (quality > 45) {
      quality -= 5
    } else if (width > 640) {
      width -= 80
      quality = 78
    } else {
      break
    }
  }

  await fs.writeFile(outputPath, buffer)

  return {
    file: baseName,
    inputKB: ((await fs.stat(inputPath)).size / 1024).toFixed(1),
    outputKB: (buffer.length / 1024).toFixed(1),
    width,
    quality,
    ok: buffer.length <= MAX_BYTES,
  }
}

async function main() {
  const entries = await fs.readdir(ASSETS_DIR)
  const images = entries
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .map((name) => path.join(ASSETS_DIR, name))

  console.log(`Converting ${images.length} images to WebP (target <= ${MAX_BYTES / 1024} KB)...\n`)

  const results = []
  for (const inputPath of images) {
    const result = await optimizeImage(inputPath)
    results.push(result)
    const status = result.ok ? 'OK' : 'WARN'
    console.log(
      `[${status}] ${result.file}: ${result.inputKB} KB -> ${result.outputKB} KB (w=${result.width}, q=${result.quality})`
    )
  }

  const totalIn = results.reduce((sum, r) => sum + Number(r.inputKB), 0)
  const totalOut = results.reduce((sum, r) => sum + Number(r.outputKB), 0)
  const overTarget = results.filter((r) => !r.ok)

  console.log('\n--- Summary ---')
  console.log(`Total: ${totalIn.toFixed(0)} KB -> ${totalOut.toFixed(0)} KB (${((1 - totalOut / totalIn) * 100).toFixed(1)}% reduction)`)
  console.log(`Under target: ${results.length - overTarget.length}/${results.length}`)

  if (overTarget.length) {
    console.log('\nFiles still over target:')
    overTarget.forEach((r) => console.log(`  - ${r.file}: ${r.outputKB} KB`))
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
