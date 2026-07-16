import fs from 'fs';
import path from 'path';

const assets = [
  { url: 'http://localhost:3845/assets/cf997855527f771f8b2f81b8842de5b95712effb.svg', name: 'calendar.svg' },
  { url: 'http://localhost:3845/assets/53ea0a895c2f930407bfce1eb9291874c00a91ac.svg', name: 'back_button.svg' },
  { url: 'http://localhost:3845/assets/9185166f3466046c937e8727b4fbc565b9fdef6a.svg', name: 'progress_ring.svg' },
  { url: 'http://localhost:3845/assets/3bd92c888020c8c0f153b7b838eb00f7b62933ce.svg', name: 'notification.svg' },
  { url: 'http://localhost:3845/assets/d7d7ca6c0ef95132464e5a8c84ae0a45a3107d2d.svg', name: 'dot_high.svg' },
  { url: 'http://localhost:3845/assets/88af285062a36bc2ddee66de5d38f79a6f862f67.svg', name: 'dot_med.svg' },
  { url: 'http://localhost:3845/assets/c5798e29e80d4baf9adfe049bab7b0894013f83d.svg', name: 'history.svg' },
  { url: 'http://localhost:3845/assets/d40a708eb0fded99e34f6a5226261c6de48a91a3.svg', name: 'leaf_title.svg' },
  { url: 'http://localhost:3845/assets/64e9ece39369b4aee8e5bc3a0c53f5b3a0de5d8e.svg', name: 'location_pin.svg' },
  { url: 'http://localhost:3845/assets/852af60ce06c4baf54182d8a2bf9939616774bf4.svg', name: 'divider_line.svg' }
];

const dir = path.join(process.cwd(), 'public', 'assets', 'figma', 'detail');
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
