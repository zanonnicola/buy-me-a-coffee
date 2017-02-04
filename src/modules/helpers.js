function attachEventListener(nodeList, eventType, func) {
  const elements = document.querySelectorAll(nodeList);
  for (const el of elements) {
    el.addEventListener(eventType, func);
  }
}

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

export { attachEventListener, ready };
