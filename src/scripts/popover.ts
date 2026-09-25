type NativePopover = HTMLElement & {
  showPopover: () => void;
  hidePopover: () => void;
};

const initializedTriggers = new WeakSet<HTMLElement>();

function setTransformOrigin(trigger: HTMLElement, popover: HTMLElement) {
  const triggerRect = trigger.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  if (!popoverRect.width || !popoverRect.height) return;

  const triggerCenterX = triggerRect.left + triggerRect.width / 2;
  const triggerCenterY = triggerRect.top + triggerRect.height / 2;
  const originX = ((triggerCenterX - popoverRect.left) / popoverRect.width) * 100;
  const originY = ((triggerCenterY - popoverRect.top) / popoverRect.height) * 100;

  popover.style.setProperty("--popover-origin-x", `${originX}%`);
  popover.style.setProperty("--popover-origin-y", `${originY}%`);
}

function setupPopover(trigger: HTMLElement, popover: HTMLElement) {
  if (initializedTriggers.has(trigger) || !("showPopover" in popover)) return;

  initializedTriggers.add(trigger);

  const nativePopover = popover as NativePopover;
  let hovering = false;
  let pinned = false;
  let hideTimer: number | undefined;

  const syncExpanded = () => {
    trigger.setAttribute(
      "aria-expanded",
      String(popover.matches(":popover-open")),
    );
  };

  const show = () => {
    window.clearTimeout(hideTimer);
    if (!popover.matches(":popover-open")) nativePopover.showPopover();

    setTransformOrigin(trigger, popover);
    requestAnimationFrame(() => setTransformOrigin(trigger, popover));
    trigger.setAttribute("aria-expanded", "true");
  };

  const hide = () => {
    window.clearTimeout(hideTimer);
    if (!hovering && !pinned && popover.matches(":popover-open")) {
      nativePopover.hidePopover();
    }
    syncExpanded();
  };

  const scheduleHide = () => {
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(hide, 80);
  };

  trigger.addEventListener("pointerenter", () => {
    hovering = true;
    show();
  });
  trigger.addEventListener("pointerleave", () => {
    hovering = false;
    scheduleHide();
  });
  trigger.addEventListener("focus", show);
  trigger.addEventListener("blur", () => {
    if (!hovering) scheduleHide();
  });
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    pinned = !pinned;
    if (pinned) show();
    else hide();
  });
  popover.addEventListener("pointerenter", () => {
    hovering = true;
    show();
  });
  popover.addEventListener("pointerleave", () => {
    hovering = false;
    scheduleHide();
  });
  popover.addEventListener("toggle", (event) => {
    const { newState } = event as ToggleEvent;

    if (newState === "open") {
      setTransformOrigin(trigger, popover);
      syncExpanded();
    } else {
      pinned = false;
      syncExpanded();
    }
  });
  window.addEventListener("resize", () => {
    if (popover.matches(":popover-open")) {
      setTransformOrigin(trigger, popover);
    }
  });
}

export function setupPopovers(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>("[data-popover-trigger]").forEach(
    (trigger) => {
      const popoverId = trigger.getAttribute("aria-controls");
      const popover = popoverId
        ? document.getElementById(popoverId)
        : null;

      if (popover) setupPopover(trigger, popover);
    },
  );
}
