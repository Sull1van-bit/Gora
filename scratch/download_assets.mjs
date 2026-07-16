import fs from 'fs';
import path from 'path';

const urls = {
  'streak.svg': '99ecb82edf093e01055d36e6180bbcbeae8f71c5.svg',
  'image9.png': '0edc54ec339e956fc790e8548cf498b670894cc4.png',
  'image10.png': 'c341a338fc50477605e09f2be81460d10bc1d722.png',
  'berita.png': '7a81bb9f27ad0e0ad8310ed643c026a6e245f739.png',
  'weather_sun.svg': 'a56c19fefe23e1efd02166e3a7e5de87b40e03c1.svg',
  'insights_growth.svg': '7906925a681d9f49efe7f547cc15704ff15d916c.svg',
  'sparkline_up.svg': '7c504ffca82b87d87adfafb2a8d2fc7c0549c223.svg',
  'sparkline_down.svg': '1c0bba76ca9c39dee3fc55443d77bbc8ac802010.svg',
  'angka7.svg': 'da5b7ee9c7d01cba1359ddb96f679835c5494598.svg',
  'leaf_bold.svg': '5d7e02f53ac60774ca9284ccd33258906dcc246d.svg',
  'water_sharp.svg': '2fd2a14a1e3c86c350ef8b4155e2719bcbc65c95.svg',
  'cloud_rain.svg': '22be2077e7b5988f08ef4860529508b44e0cd59c.svg',
  'bulb_filled.svg': 'a39b8d6fb0b68febf840367b0d3a821baec8cbfd.svg',
  'water_pump.svg': 'b5df3e7430d6928ac570dba053897952bee32b41.svg',
  'water_drop.svg': 'f8bd4435e0301adc6c4053bf033ebfd6f9f5b1c3.svg',
  'profile_icon.svg': '8014c6be56ae76cc6ae63399edd919992dd6d28f.svg',
  'document_icon.svg': 'f19a1391af33f6f91f23fbdf32db1cb91f0d019a.svg',
  'home_icon.svg': '9749ac198bcd781714af44a9066d709d0da969ad.svg',
  'add_icon.svg': 'b1d505382c7f0724db1b75eeed1f8dd7315c1964.svg'
};

const targetDir = path.resolve('public', 'assets', 'figma');
fs.mkdirSync(targetDir, { recursive: true });

async function downloadAll() {
  for (const [filename, hash] of Object.entries(urls)) {
    const url = `http://localhost:3845/assets/${hash}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(path.join(targetDir, filename), Buffer.from(buffer));
        console.log(`Saved: ${filename}`);
      } else {
        console.error(`Status ${res.status} for ${filename}`);
      }
    } catch (err) {
      console.error(`Error ${filename}:`, err.message);
    }
  }
}

downloadAll();
