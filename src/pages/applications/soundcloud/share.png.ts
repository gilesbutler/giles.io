import type { APIRoute } from 'astro';
import sharp from 'sharp';
import artwork from '../../../assets/applications/soundcloud-share.svg?raw';

// Static output at build time: social crawlers receive a real PNG, not SVG.
// Sharp is already installed with this repository's Astro image pipeline.
export const prerender = true;
export const GET: APIRoute = async () => {
  const image = await sharp(Buffer.from(artwork))
    .resize(1200, 630)
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
  return new Response(new Uint8Array(image), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=3600' },
  });
};
