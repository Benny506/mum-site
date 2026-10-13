const emit = (name, detail) => {
  try {
    window.dispatchEvent(new CustomEvent("mum-preview-analytics", { detail: { name, ...detail } }));
  } catch {
    /* no-op */
  }
  if (import.meta.env.DEV) {
    console.debug(`[preview-analytics] ${name}`, detail);
  }
};

export const trackPreviewView = ({ route, entityType, status }) =>
  emit("preview_view", { route, entity_type: entityType, status });

export const trackOpenAppTap = ({ route, entityType }) =>
  emit("open_app_tap", { route, entity_type: entityType });

export const trackStoreTap = ({ route, entityType, store }) =>
  emit("store_tap", { route, entity_type: entityType, store });

export const trackUnavailableView = ({ route, entityType, reason }) =>
  emit("unavailable_view", { route, entity_type: entityType, reason });
