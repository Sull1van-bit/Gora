import fs from 'fs';
import path from 'path';

const assets = [
  { url: 'http://localhost:3845/assets/0e3ea1f4af7bdc0353252fa8af7de9366406fd82.png', name: 'search.png' },
  { url: 'http://localhost:3845/assets/64e9ece39369b4aee8e5bc3a0c53f5b3a0de5d8e.svg', name: 'location_pin.svg' },
  { url: 'http://localhost:3845/assets/adf94c90495d24e10986bf2750925cb46f1037bd.svg', name: 'dropdown_arrow.svg' },
  { url: 'http://localhost:3845/assets/80498ce81b46f4d3b183c53eda834d54a4b2960f.svg', name: 'calendar.svg' },
  { url: 'http://localhost:3845/assets/c2e27a581e58bd78b77e321cf0320bd61c374524.svg', name: 'close_x.svg' }
];

const dir = path.join(process.cwd(), 'public', 'assets', 'figma', 'addplot');
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
