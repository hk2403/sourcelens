import type { InspectionResult } from '../../shared/models/inspection';
let selectedElement: HTMLElement | null = null;

const overlay = document.createElement('div');

overlay.id = 'sourcelens-overlay';

Object.assign(overlay.style, {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: '2147483647',
  border: '2px solid #2563eb',
  backgroundColor: 'rgba(37, 99, 235, 0.08)',
  display: 'none',
  boxSizing: 'border-box',
});

const label = document.createElement('div');

label.id = 'sourcelens-label';

Object.assign(label.style, {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: '2147483647',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  padding: '3px 6px',
  borderRadius: '3px',
  fontFamily: 'monospace',
  fontSize: '12px',
  lineHeight: '16px',
  whiteSpace: 'nowrap',
  display: 'none',
});

document.documentElement.appendChild(overlay);
document.documentElement.appendChild(label);

function getElementLabel(element: HTMLElement): string {
  const tagName = element.tagName.toLowerCase();

  const id = element.id ? `#${element.id}` : '';

  const classes = Array.from(element.classList)
    .slice(0, 3)
    .map((className) => `.${className}`)
    .join('');

  return `${tagName}${id}${classes}`;
}

function showElement(element: HTMLElement): void {
  const rect = element.getBoundingClientRect();

  Object.assign(overlay.style, {
    display: 'block',
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
  });

  label.textContent = getElementLabel(element);

  const labelTop = Math.max(0, rect.top - 24);

  Object.assign(label.style, {
    display: 'block',
    left: `${rect.left}px`,
    top: `${labelTop}px`,
  });
}

function hideElement(): void {
  overlay.style.display = 'none';
  label.style.display = 'none';
}

function handleMouseOver(event: MouseEvent): void {
  if (selectedElement) {
    return;
  }

  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (
    target === overlay ||
    target === label ||
    overlay.contains(target) ||
    label.contains(target)
  ) {
    return;
  }

  showElement(target);
}

function handleMouseOut(event: MouseEvent): void {
  const relatedTarget = event.relatedTarget;

  if (
    relatedTarget instanceof Node &&
    (
      relatedTarget === overlay ||
      relatedTarget === label ||
      overlay.contains(relatedTarget) ||
      label.contains(relatedTarget)
    )
  ) {
    return;
  }

  if (selectedElement) {
    showElement(selectedElement);
  } else {
    hideElement();
  }
}

function createInspectionResult(
    element: HTMLElement,
): InspectionResult {
    return {
        element: {
            tagName: element.tagName.toLowerCase(),
            ...(element.id ? { id: element.id } : {}),
            classes: Array.from(element.classList),
        },
    };
}

function handleClick(event: MouseEvent): void {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
        return;
    }

    if (
        target === overlay ||
        target === label ||
        overlay.contains(target) ||
        label.contains(target)
    ) {
        return;
    }

    selectedElement = target;

    showElement(selectedElement);

    event.preventDefault();
    event.stopPropagation();

    const inspectionResult = createInspectionResult(selectedElement);

    console.log(
        'SourceLens inspection result:',
        inspectionResult,
    );
}

function handleKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    selectedElement = null;
    hideElement();

    console.log('SourceLens selection cleared');
  }
}

document.addEventListener('mouseover', handleMouseOver, true);
document.addEventListener('mouseout', handleMouseOut, true);
document.addEventListener('click', handleClick, true);
document.addEventListener('keydown', handleKeyDown, true);