// Campus-history preview lookup. The story dataset is an app-local seed
// (JSON + bundled images), so the web preview resolves stories from a
// lazily-imported copy of the seed JSON instead of Supabase. Photos are not
// available to the web build, so history previews render text-only.
let momentsCache = null;

async function loadMoments() {
  if (!momentsCache) {
    const mod = await import(
      '../../../app/MUM/components/main/screens/campusHistory/data/unicalHistory.json'
    );
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
