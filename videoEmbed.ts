export function getEmbedUrl(url: string): string {
  if (!url) return '';

  // YouTube
  const ytMatch =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/) ||
    url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  // Direct embed URL
  if (url.includes('embed')) return url;

  return '';
}

export function getThumbnailUrl(embedUrl: string): string {
  const ytMatch = embedUrl.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  }
  return '';
}
