import { pdf } from 'pdf-to-img';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const outDir = join(rootDir, 'public', 'assets', 'certificate');

async function convertPdf(pdfPath, outPath) {
  console.log(`Converting: ${pdfPath}`);
  const doc = await pdf(pdfPath, { scale: 2.5 });
  // Get first page only
  for await (const page of doc) {
    writeFileSync(outPath, page);
    console.log(`✓ Saved: ${outPath}`);
    break; // Only first page
  }
}

await convertPdf(
  join(outDir, 'registration certi.pdf'),
  join(outDir, 'registration-cert.png')
);

await convertPdf(
  join(outDir, 'certificate.pdf'),
  join(outDir, 'manufacturing-cert.png')
);

console.log('✅ Done!');
