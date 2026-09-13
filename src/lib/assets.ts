/** Filename without its extension, e.g. "headshot.jpeg" -> "headshot". Matching by stem means the
 * data files only need to name a photo, not guess whether it'll be saved as .jpg vs .jpeg. */
function stem(path: string): string {
  return (path.split('/').pop() ?? path).replace(/\.[^./]+$/, '');
}

function createImageResolver(images: Record<string, string>) {
  const byStem = new Map(
    Object.entries(images).map(([path, url]) => [stem(path), url]),
  );
  return (name: string): string | undefined => byStem.get(stem(name));
}

const certificateImages = import.meta.glob<string>(
  '../assets/certificates/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, import: 'default' },
);
const resolveCertificateImage = createImageResolver(certificateImages);

export function getCertificateImage(filename: string): string {
  const url = resolveCertificateImage(filename);
  if (!url) {
    throw new Error(
      `Certificate image "${filename}" not found in src/assets/certificates`,
    );
  }
  return url;
}

const profileImages = import.meta.glob<string>(
  '../assets/profile/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, import: 'default' },
);
const resolveProfileImage = createImageResolver(profileImages);

/** Returns undefined (instead of throwing) so callers can render a fallback until a photo is added. */
export function getProfileImage(filename: string): string | undefined {
  return resolveProfileImage(filename);
}

const galleryImages = import.meta.glob<string>(
  '../assets/gallery/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, import: 'default' },
);
const resolveGalleryImage = createImageResolver(galleryImages);

/** Returns undefined (instead of throwing) so callers can skip entries whose file hasn't been added yet. */
export function getGalleryImage(filename: string): string | undefined {
  return resolveGalleryImage(filename);
}
