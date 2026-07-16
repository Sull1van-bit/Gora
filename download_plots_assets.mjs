import fs from 'fs';
import path from 'path';

const assets = [
  { url: 'http://localhost:3845/assets/01eee7ca27a80b85e4235a1edf5a0ec03ce6ed60.svg', name: 'search_icon.svg' },
  { url: 'http://localhost:3845/assets/84cbc350deb84d1d6e99a8320e123a2a22b4eeb0.svg', name: 'add_plus.svg' },
  { url: 'http://localhost:3845/assets/cf997855527f771f8b2f81b8842de5b95712effb.svg', name: 'calendar_icon.svg' },
  { url: 'http://localhost:3845/assets/504909617de75c6773eba0acaee30bce5a5272e3.svg', name: 'dot_bullet.svg' }
];

const dir = path.join(process.cwd(), 'public', 'assets', 'figma', 'plots');
fs.mkdirSync(dir, { recursive: true });

async function downloadAll() {
  for (const item of assets) {
    try {
      const res = await fetch(item.url);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(path.join(dir, item.name), Buffer.from(buffer));
        console.log(`Downloaded ${item.name}`);
      } else {
        console.error(`Failed ${item.name}: ${res.status}`);
      }
    } catch (err) {
      console.error(`Error downloading ${item.name}: ${err.message}`);
    }
  }
}

downloadAll();
