import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'icons');
mkdirSync(outDir, { recursive: true });

const CRC_TABLE = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC_TABLE[n] = c >>> 0;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([length, typeBuf, data, crcBuf]);
}

function writePng(path, size, { padded = false } = {}) {
  const pixels = Buffer.alloc(size * size * 4);
  const bg = [11, 13, 18];
  const teal = [62, 224, 197];
  const ink = [11, 13, 18];

  for (let i = 0; i < size * size; i += 1) {
    const o = i * 4;
    pixels[o] = bg[0];
    pixels[o + 1] = bg[1];
    pixels[o + 2] = bg[2];
    pixels[o + 3] = 255;
  }

  const inset = padded ? size * 0.18 : size * 0.08;
  const radius = size * 0.18;
  const left = inset;
  const top = inset;
  const right = size - inset;
  const bottom = size - inset;

  function inRoundedRect(x, y) {
    const rx = Math.max(left + radius, Math.min(x, right - radius));
    const ry = Math.max(top + radius, Math.min(y, bottom - radius));
    if (x >= left + radius && x <= right - radius && y >= top && y <= bottom) return true;
    if (y >= top + radius && y <= bottom - radius && x >= left && x <= right) return true;
    const dx = x - rx;
    const dy = y - ry;
    return dx * dx + dy * dy <= radius * radius;
  }

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!inRoundedRect(x + 0.5, y + 0.5)) continue;
      const i = (y * size + x) * 4;
      pixels[i] = teal[0];
      pixels[i + 1] = teal[1];
      pixels[i + 2] = teal[2];
    }
  }

  const triLeft = size * (padded ? 0.40 : 0.38);
  const triRight = size * (padded ? 0.68 : 0.70);
  const triTop = size * 0.32;
  const triBottom = size * 0.68;
  const triMid = size * 0.5;

  function inTriangle(px, py) {
    const x1 = triLeft;
    const y1 = triTop;
    const x2 = triLeft;
    const y2 = triBottom;
    const x3 = triRight;
    const y3 = triMid;
    const area = (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2;
    const a1 = (px * (y2 - y3) + x2 * (y3 - py) + x3 * (py - y2)) / 2;
    const a2 = (x1 * (py - y3) + px * (y3 - y1) + x3 * (y1 - py)) / 2;
    const a3 = (x1 * (y2 - py) + x2 * (py - y1) + px * (y1 - y2)) / 2;
    const s = Math.sign(area);
    return s * a1 >= 0 && s * a2 >= 0 && s * a3 >= 0 && Math.abs(a1) + Math.abs(a2) + Math.abs(a3) <= Math.abs(area) + 1;
  }

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!inTriangle(x + 0.5, y + 0.5)) continue;
      const i = (y * size + x) * 4;
      pixels[i] = ink[0];
      pixels[i + 1] = ink[1];
      pixels[i + 2] = ink[2];
    }
  }

  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y += 1) {
    const rowStart = y * (size * 4 + 1);
    raw[rowStart] = 0;
    pixels.copy(raw, rowStart + 1, y * size * 4, (y + 1) * size * 4);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);

  writeFileSync(path, png);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="#0b0d12"/>
  <rect x="6" y="6" width="52" height="52" rx="14" fill="#3ee0c5"/>
  <path d="M26 20.5v23L46 32z" fill="#0b0d12"/>
</svg>
`;

writeFileSync(join(outDir, 'favicon.svg'), svg);
writePng(join(outDir, 'icon-192.png'), 192);
writePng(join(outDir, 'icon-512.png'), 512);
writePng(join(outDir, 'maskable-192.png'), 192, { padded: true });
writePng(join(outDir, 'maskable-512.png'), 512, { padded: true });
writePng(join(outDir, 'apple-touch-icon.png'), 180);
console.log('Icons generated in public/icons');
