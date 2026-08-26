// Standalone SDOM WEB-GUI entry point.
// Minimal host-independent DOM primitives.
// No application semantics, global registration, state management or styling policy.
const flat = values => values.flat(Infinity).filter(value => value != null && value !== false);
const child = value => value instanceof Node ? value : document.createTextNode(String(value));

function h(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value == null) continue;
    if (key === 'className') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'dataset') Object.assign(node.dataset, value);
    else if (key === 'on') for (const [event, handler] of Object.entries(value)) node.addEventListener(event, handler);
    else if (key === 'attrs') for (const [name, attr] of Object.entries(value)) node.setAttribute(name, attr);
    else if (key in node) node[key] = value;
    else node.setAttribute(key, value);
  }
  node.append(...flat([children]).map(child));
  return node;
}

const button = (text, props = {}, children = []) => h('button', { type: 'button', ...props, dataset: { ui: 'button', ...(props.dataset ?? {}) } }, children.length ? children : text);
const input = (props = {}) => h('input', { ...props, dataset: { ui: 'input', ...(props.dataset ?? {}) } });
const select = (props = {}) => h('select', { ...props, dataset: { ui: 'select', ...(props.dataset ?? {}) } });
const option = (value, text, props = {}) => h('option', { ...props, value, text });
const textarea = (props = {}) => h('textarea', { ...props, dataset: { ui: 'textarea', ...(props.dataset ?? {}) } });
const field = (text, control, props = {}) => h('label', { ...props, dataset: { ui: 'field', ...(props.dataset ?? {}) } }, [text, control]);
const row = (children, props = {}) => h('div', { ...props, dataset: { ui: 'row', ...(props.dataset ?? {}) } }, children);
const stack = (children, props = {}) => h('div', { ...props, dataset: { ui: 'stack', ...(props.dataset ?? {}) } }, children);
const replace = (parent, children = []) => (parent.replaceChildren(...flat([children]).map(child)), parent);
const mount = (parent, children) => (parent.append(...flat([children]).map(child)), children);
const vars = (node, values) => {
  for (const [name, value] of Object.entries(values)) node.style.setProperty(`--${name}`, value);
  return node;
};

function dialog({ id, title, children = [], dataset = {}, className = '' }) {
  const card = h('div', { className, dataset: { ui: 'dialog-card' } }, [h('h3', { text: title }), children]);
  return h('div', { id, hidden: true, dataset: { ui: 'dialog', ...dataset } }, [card]);
}

export const SDOM = Object.freeze({ h, button, input, select, option, textarea, field, row, stack, dialog, replace, mount, vars });
