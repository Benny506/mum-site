// Campus-history preview lookup. The story dataset is mirrored from the
// app seed (see app/MUM/.../campusHistory/data/unicalHistory.json) into
// src/preview/data/unicalHistory.json so the standalone web repo builds
// self-contained. Photos are not available to the web build, so history
// previews render text-only.
let momentsCache = null;

async function loadMoments() {
  if (!momentsCache) {
    const mod = await import('./data/unicalHistory.json');
    const doc = mod.default || mod;
    momentsCache = Array.isArray(doc?.moments) ? doc.moments : [];
  }
  return momentsCache;
}

export async function fetchHistoryPreview(momentId) {
  if (!momentId) return { status: 'unavailable', reason: 'not-found' };
  try {
    const moments = await loadMoments();
    const moment = moments.find((m) => m?.id === momentId || m?.slug === momentId);
    if (!moment) return { status: 'unavailable', reason: 'not-found' };
    return { status: 'ok', data: moment };
  } catch (e) {
    return { status: 'error', reason: 'load-failed', message: e?.message || 'Preview failed to load' };
  }
}
