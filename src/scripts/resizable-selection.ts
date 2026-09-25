type ResizeCorner = "tl" | "tr" | "bl" | "br";

type CornerVector = {
  x: -1 | 1;
  y: -1 | 1;
  originX: string;
  originY: string;
};

const resizeMin = 0.45;
const resizeMax = 2.25;

const cornerVectors: Record<ResizeCorner, CornerVector> = {
  tl: { x: -1, y: -1, originX: "100%", originY: "100%" },
  tr: { x: 1, y: -1, originX: "0%", originY: "100%" },
  bl: { x: -1, y: 1, originX: "100%", originY: "0%" },
  br: { x: 1, y: 1, originX: "0%", originY: "0%" },
};

const resizeProperties = [
  "--resize-base-width",
  "--resize-base-height",
  "--resize-scale",
  "--resize-offset-x",
  "--resize-offset-y",
  "--resize-content-left",
  "--resize-content-top",
  "--resize-origin",
];

export function setupResizableSelections(root: ParentNode = document) {
  const headings = Array.from(
    root.querySelectorAll<HTMLElement>("[data-resizable-heading]"),
  );

  headings.forEach((resizeHeading) => {
    const resizeContent = resizeHeading.querySelector<HTMLElement>(
      ".display-name-content",
    );
    const resizeHandles = Array.from(
      resizeHeading.querySelectorAll<HTMLElement>(".h"),
    );

    if (!resizeContent || resizeHandles.length !== 4) return;

    let baseWidth = 0;
    let baseHeight = 0;
    let scale = 1;
    let frame: number | null = null;
    let pendingPointer: { x: number; y: number } | null = null;
    let activeResize: {
      pointerId: number;
      corner: ResizeCorner;
      startX: number;
      startY: number;
      startWidth: number;
      startHeight: number;
      startScale: number;
    } | null = null;

    const getCorner = (handle: HTMLElement): ResizeCorner | null => {
      for (const corner of Object.keys(cornerVectors) as ResizeCorner[]) {
        if (handle.classList.contains(corner)) return corner;
      }
      return null;
    };

    const applyScale = (requestedScale: number, corner: ResizeCorner) => {
      scale = Math.min(resizeMax, Math.max(resizeMin, requestedScale));
      const vector = cornerVectors[corner];
      const delta = scale - 1;

      resizeHeading.style.setProperty("--resize-scale", String(scale));
      resizeHeading.style.setProperty(
        "--resize-offset-x",
        `${vector.x * delta * (baseWidth / 2)}px`,
      );
      resizeHeading.style.setProperty(
        "--resize-offset-y",
        `${vector.y * delta * (baseHeight / 2)}px`,
      );
      resizeHeading.style.setProperty(
        "--resize-content-left",
        `${vector.x < 0 ? delta * baseWidth : 0}px`,
      );
      resizeHeading.style.setProperty(
        "--resize-content-top",
        `${vector.y < 0 ? delta * baseHeight : 0}px`,
      );
      resizeHeading.style.setProperty(
        "--resize-origin",
        `${vector.originX} ${vector.originY}`,
      );
    };

    const prepareResizeBox = () => {
      if (resizeHeading.classList.contains("resize-ready")) return true;

      const rect = resizeHeading.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return false;

      baseWidth = rect.width;
      baseHeight = rect.height;
      resizeHeading.style.setProperty("--resize-base-width", `${baseWidth}px`);
      resizeHeading.style.setProperty(
        "--resize-base-height",
        `${baseHeight}px`,
      );
      resizeHeading.classList.add("resize-ready");
      applyScale(1, "br");
      return true;
    };

    const resetResize = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      pendingPointer = null;
      activeResize = null;
      scale = 1;
      resizeHeading.classList.remove("resize-ready", "is-resizing");
      resizeProperties.forEach((property) =>
        resizeHeading.style.removeProperty(property),
      );
    };

    const flushPointer = () => {
      frame = null;
      if (!activeResize || !pendingPointer) return;

      const vector = cornerVectors[activeResize.corner];
      const movementX = (pendingPointer.x - activeResize.startX) * vector.x;
      const movementY = (pendingPointer.y - activeResize.startY) * vector.y;
      const widthScale = 1 + movementX / activeResize.startWidth;
      const heightScale = 1 + movementY / activeResize.startHeight;
      const relativeScale = Math.max(widthScale, heightScale);

      applyScale(activeResize.startScale * relativeScale, activeResize.corner);
    };

    const finishPointerResize = (pointerId: number, revert = false) => {
      if (!activeResize || activeResize.pointerId !== pointerId) return;

      if (pendingPointer) flushPointer();
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      pendingPointer = null;

      if (revert) applyScale(activeResize.startScale, activeResize.corner);

      activeResize = null;
      resizeHeading.classList.remove("is-resizing");
    };

    resizeHandles.forEach((handle) => {
      handle.addEventListener("pointerdown", (event) => {
        const corner = getCorner(handle);
        if (!corner || event.button !== 0) return;
        if (!prepareResizeBox()) return;

        event.preventDefault();
        event.stopPropagation();

        const rect = resizeHeading.getBoundingClientRect();
        activeResize = {
          pointerId: event.pointerId,
          corner,
          startX: event.clientX,
          startY: event.clientY,
          startWidth: rect.width,
          startHeight: rect.height,
          startScale: scale,
        };
        resizeHeading.classList.add("is-resizing");
        handle.setPointerCapture(event.pointerId);
      });

      handle.addEventListener("pointermove", (event) => {
        if (!activeResize || activeResize.pointerId !== event.pointerId) return;

        pendingPointer = { x: event.clientX, y: event.clientY };
        if (frame === null) frame = requestAnimationFrame(flushPointer);
      });

      handle.addEventListener("pointerup", (event) => {
        finishPointerResize(event.pointerId);
      });

      handle.addEventListener("pointercancel", (event) => {
        finishPointerResize(event.pointerId, true);
      });

      handle.addEventListener("lostpointercapture", (event) => {
        finishPointerResize(event.pointerId);
      });
    });

    window.addEventListener("resize", () => {
      if (!activeResize) resetResize();
    });
  });
}
