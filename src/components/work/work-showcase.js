/**
 * Work showcase: progressively enhanced HTML with local, illustrative demos.
 * No analytics, accounts, filesystem access, audio, external AI or persistence.
 * One section instance per page. Public init()/destroy() support Astro navigation.
 */
(() => {
  "use strict";
  if (window.GilesWorkShowcase) {
    window.GilesWorkShowcase.init();
    return;
  }
  const instances = new Map();
  const q = (root, selector) => root.querySelector(selector);
  const qa = (root, selector) => Array.from(root.querySelectorAll(selector));
  const presets = {
    studio: {
      prompt:
        "A recording studio for electronic artists. A place to turn unfinished ideas into finished records.",
      brand: "North Loop.",
      kicker: "INDEPENDENT RECORDING STUDIO",
      title: "Finish the record you started.",
      description:
        "A space for electronic artists to record, experiment and find their sound.",
      cta: "Find your session ↗",
    },
    bakery: {
      prompt:
        "A neighbourhood bakery making slow-fermented sourdough and seasonal pastries. Fresh every morning.",
      brand: "Sunday Bread.",
      kicker: "YOUR NEIGHBOURHOOD BAKERY",
      title: "Good things take their time.",
      description:
        "Slow-fermented sourdough, warm pastries and something worth getting up for.",
      cta: "See what’s baking ↗",
    },
  };
  const architecture = {
    app: [
      "The interface and the state behind it.",
      "I architected and built the Vue 3 application with XState, Vite, VueUse, FormKit and Tailwind CSS.",
    ],
    services: [
      "Product capability, not just a generation endpoint.",
      "My work spans a Node.js serverless backend, AI providers, billing, authentication, email and third-party integrations.",
    ],
    sites: [
      "Send HTML first. Add JavaScript where it earns its place.",
      "Generated sites use a static-first islands approach, with Vue hydrated for interactivity. Newer work moves to Astro.",
    ],
    delivery: [
      "Every small decision has a large footprint.",
      "Image delivery, fonts, assets and responsive templates share GCP and Cloudflare infrastructure across customer sites.",
    ],
    measure: [
      "Keep the people using it in the loop.",
      "I work across customer support and product, using PostHog and Cloudflare to monitor behaviour and inform iteration.",
    ],
  };
  const seedProjects = [
    {
      id: "afterglow",
      name: "Afterglow",
      daw: "Ableton",
      status: "Mixing",
      root: "Studio SSD",
      note: "Arrangement is there. Tighten the kick and bass before the next bounce.",
      file: "afterglow-v3.wav",
    },
    {
      id: "tape-study",
      name: "Tape Study 04",
      daw: "Logic",
      status: "Idea",
      root: "Archive",
      note: "The texture is worth keeping. Try a simpler progression underneath it.",
      file: "tape-study-04.wav",
    },
    {
      id: "sunday",
      name: "Sunday Sketch",
      daw: "Ableton",
      status: "Arranging",
      root: "Studio SSD",
      note: "Keep the first drop sparse. Move the extra percussion into the second half.",
      file: "sunday-sketch-v2.wav",
    },
    {
      id: "glasshouse",
      name: "Glasshouse",
      daw: "Bitwig",
      status: "Mixing",
      root: "Studio SSD",
      note: "Check the low end on another system. Leave the field recording in.",
      file: "glasshouse-premaster.wav",
    },
    {
      id: "low-light",
      name: "Low Light",
      daw: "Logic",
      status: "Released",
      root: "Archive",
      note: "Final version. Keep the session and final bounce together for the archive.",
      file: "low-light-master.wav",
    },
    {
      id: "drift",
      name: "Drift Pattern",
      daw: "Ableton",
      status: "Idea",
      root: "Archive",
      note: "Come back to the delayed chord. There is something in the first eight bars.",
      file: "drift-pattern-01.wav",
    },
  ];
  const statuses = ["Idea", "Arranging", "Mixing", "Released"];
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const folderIcon = () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "ws-icon");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.6");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M3 7V5h6l2 2h10v13H3V7Z");
    svg.append(path);
    return svg;
  };
  function mount(root) {
    if (instances.has(root)) return;
    const abort = new AbortController();
    const on = (target, event, callback, options = {}) =>
      target?.addEventListener(event, callback, {
        ...options,
        signal: abort.signal,
      });
    const announce = (message) => {
      const status = q(root, "[data-work-status]");
      if (status) status.textContent = message;
    };
    let preset = "studio";
    let imageTimer;
    let layoutFrame;
    const layoutChangeEvent = "work-showcase-layout-change";
    const tabs = qa(root, "[data-mixo-tab]");

    function syncLayout(anchor, anchorTop) {
      if (layoutFrame) cancelAnimationFrame(layoutFrame);
      layoutFrame = requestAnimationFrame(() => {
        layoutFrame = undefined;
        const offset =
          anchor?.isConnected && anchorTop !== undefined
            ? anchor.getBoundingClientRect().top - anchorTop
            : 0;

        if (Math.abs(offset) > 0.5) {
          const html = document.documentElement;
          const previousScrollBehavior = html.style.scrollBehavior;
          html.style.scrollBehavior = "auto";
          window.scrollTo(window.scrollX, window.scrollY + offset);
          html.style.scrollBehavior = previousScrollBehavior;
        }

        window.dispatchEvent(new Event(layoutChangeEvent));
      });
    }

    function captureInteractivePosition(event) {
      const target =
        event.target instanceof Element
          ? event.target.closest("button, input, select, summary")
          : null;
      if (!target || !root.contains(target)) return;

      const anchor =
        target.closest(".ws-stage, .ws-case, .ws-track-record") || target;
      syncLayout(anchor, anchor.getBoundingClientRect().top);
    }

    on(root, "pointerdown", captureInteractivePosition, { capture: true });
    on(
      root,
      "keydown",
      (event) => {
        if (
          [
            "Enter",
            " ",
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "Home",
            "End",
          ].includes(event.key)
        )
          captureInteractivePosition(event);
      },
      { capture: true },
    );

    function selectTab(name, focus = false) {
      const selectedTab = tabs.find((tab) => tab.dataset.mixoTab === name);
      const anchorTop = selectedTab?.getBoundingClientRect().top;

      tabs.forEach((tab) => {
        const selected = tab.dataset.mixoTab === name;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        q(root, "#" + tab.getAttribute("aria-controls")).hidden = !selected;
        if (selected && focus) tab.focus({ preventScroll: true });
      });

      syncLayout(selectedTab, anchorTop);
    }
    tabs.forEach((tab, i) => {
      on(tab, "click", () => selectTab(tab.dataset.mixoTab));
      on(tab, "keydown", (event) => {
        let next;
        if (event.key === "ArrowRight") next = (i + 1) % tabs.length;
        if (event.key === "ArrowLeft")
          next = (i - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          selectTab(tabs[next].dataset.mixoTab, true);
        }
      });
    });
    qa(root, "[data-preset]").forEach((button) =>
      on(button, "click", () => {
        preset = button.dataset.preset;
        q(root, "[data-preset-prompt]").textContent = presets[preset].prompt;
        qa(root, "[data-preset]").forEach((b) =>
          b.setAttribute("aria-pressed", String(b === button)),
        );
        announce(
          `${button.textContent} example selected. This is a preset demonstration.`,
        );
      }),
    );
    on(q(root, "[data-generate]"), "click", () => {
      const data = presets[preset];
      ["brand", "kicker", "title", "description", "cta"].forEach((key) => {
        q(root, `[data-example-${key}]`).textContent = data[key];
      });
      q(root, "[data-example-site]").dataset.theme = preset;
      q(root, "[data-prompt]").hidden = true;
      q(root, "[data-result]").hidden = false;
      q(root, "[data-back-prompt]").focus({ preventScroll: true });
      announce(
        "Preset website shown. This is illustrative output, not a live AI generation.",
      );
    });
    on(q(root, "[data-back-prompt]"), "click", () => {
      q(root, "[data-result]").hidden = true;
      q(root, "[data-prompt]").hidden = false;
      q(root, "[data-generate]").focus({ preventScroll: true });
    });
    on(q(root, "[data-show-system]"), "click", () => selectTab("system", true));
    qa(root, "[data-node]").forEach((button) =>
      on(button, "click", () => {
        qa(root, "[data-node]").forEach((b) =>
          b.setAttribute("aria-pressed", String(b === button)),
        );
        const [title, copy] = architecture[button.dataset.node];
        q(root, "[data-node-title]").textContent = title;
        q(root, "[data-node-copy]").textContent = copy;
      }),
    );

    // The library uses fictional data. No file scanning, audio or network access.
    let projects = seedProjects.map((p) => ({ ...p }));
    let selected = "afterglow";
    let view = "list";
    const search = q(root, "[data-project-search]");
    const filter = q(root, "[data-daw-filter]");
    const list = q(root, "[data-project-list]");
    const board = q(root, "[data-project-board]");
    const context = q(root, "[data-project-context]");
    const libraryCount = q(root, "[data-library-count]");
    function projectButton(project, isBoard) {
      const button = el("button", isBoard ? "ws-board-card" : "ws-project-row");
      button.type = "button";
      button.dataset.projectId = project.id;
      button.setAttribute("aria-pressed", String(project.id === selected));
      button.setAttribute(
        "aria-label",
        `${project.name}, ${project.daw}, ${project.status}. Show project context.`,
      );
      if (isBoard) {
        button.append(
          el("strong", "", project.name),
          el("span", "", project.daw),
        );
      } else {
        const pill = el("span", "ws-status-pill", project.status);
        pill.dataset.status = project.status;
        button.append(
          folderIcon(),
          el("span", "ws-project-name", project.name),
          el("span", "ws-project-daw", project.daw),
          pill,
        );
      }
      return button;
    }
    function renderLibrary() {
      const focusedId = document.activeElement?.dataset?.projectId;
      const term = search.value.trim().toLocaleLowerCase();
      const visible = projects.filter(
        (p) =>
          (filter.value === "all" || p.daw === filter.value) &&
          `${p.name} ${p.daw} ${p.status}`.toLocaleLowerCase().includes(term),
      );
      if (!visible.some((p) => p.id === selected))
        selected = visible[0]?.id ?? null;
      list.replaceChildren(...visible.map((p) => projectButton(p, false)));
      board.replaceChildren(
        ...statuses.map((status) => {
          const column = el("div", "ws-board-column");
          const matches = visible.filter((p) => p.status === status);
          const title = el("h5");
          title.append(
            el("span", "", status),
            el("span", "", String(matches.length)),
          );
          column.append(title, ...matches.map((p) => projectButton(p, true)));
          return column;
        }),
      );
      const hasProjects = visible.length > 0;
      list.hidden = view !== "list" || !hasProjects;
      board.hidden = view !== "board" || !hasProjects;
      q(root, "[data-empty]").hidden = hasProjects;
      context.hidden = !hasProjects;
      if (libraryCount) {
        libraryCount.textContent = `${visible.length} ${visible.length === 1 ? "project" : "projects"}. A place to pick things up.`;
      }
      const current = projects.find((p) => p.id === selected);
      if (current) {
        q(root, "[data-selected-name]").textContent = current.name;
        q(root, "[data-selected-note]").textContent = current.note;
        q(root, "[data-selected-file]").textContent = current.file;
        q(root, "[data-project-status]").value = current.status;
      }
      if (focusedId)
        q(
          view === "list" ? list : board,
          `[data-project-id="${focusedId}"]`,
        )?.focus({ preventScroll: true });
    }
    [list, board].forEach((container) => {
      on(container, "click", (event) => {
        const button = event.target.closest("[data-project-id]");
        if (!button) return;
        selected = button.dataset.projectId;
        renderLibrary();
        announce(
          `${projects.find((p) => p.id === selected).name} selected. Project notes and status shown below.`,
        );
      });
      on(container, "keydown", (event) => {
        if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key))
          return;
        const buttons = qa(container, "[data-project-id]");
        const index = buttons.indexOf(document.activeElement);
        if (index < 0) return;
        event.preventDefault();
        let next =
          event.key === "ArrowDown"
            ? Math.min(index + 1, buttons.length - 1)
            : Math.max(index - 1, 0);
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = buttons.length - 1;
        buttons[next].focus();
      });
    });
    on(search, "input", renderLibrary);
    on(filter, "change", () => {
      renderLibrary();
      announce(libraryCount?.textContent || "Project filters updated.");
    });
    on(q(root, "[data-project-status]"), "change", (event) => {
      const project = projects.find((p) => p.id === selected);
      if (!project || !statuses.includes(event.target.value)) return;
      project.status = event.target.value;
      renderLibrary();
      announce(
        `${project.name} moved to ${project.status}. This change is only in the local demo.`,
      );
    });
    qa(root, "[data-library-view]").forEach((button) =>
      on(button, "click", () => {
        view = button.dataset.libraryView;
        qa(root, "[data-library-view]").forEach((b) =>
          b.setAttribute("aria-pressed", String(b === button)),
        );
        renderLibrary();
        announce(`${view === "list" ? "List" : "Board"} view selected.`);
      }),
    );
    on(q(root, "[data-clear-filters]"), "click", () => {
      search.value = "";
      filter.value = "all";
      renderLibrary();
      search.focus({ preventScroll: true });
    });
    on(q(root, "[data-mix-reset]"), "click", () => {
      projects = seedProjects.map((p) => ({ ...p }));
      selected = "afterglow";
      view = "list";
      search.value = "";
      filter.value = "all";
      qa(root, "[data-library-view]").forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.libraryView === view)),
      );
      renderLibrary();
      announce("Demo reset. Six fictional projects restored.");
    });
    renderLibrary();

    // Native disclosures change document height. Keep the clicked summary in place
    // while the scroll engine refreshes its measurements.
    const detailAnchors = new WeakMap();
    qa(root, "details").forEach((detail) => {
      const summary = q(detail, "summary");
      if (!summary) return;
      const rememberSummaryPosition = () => {
        detailAnchors.set(detail, {
          anchor: summary,
          top: summary.getBoundingClientRect().top,
        });
      };
      on(summary, "pointerdown", rememberSummaryPosition);
      on(summary, "keydown", (event) => {
        if (event.key === "Enter" || event.key === " ")
          rememberSummaryPosition();
      });
      on(detail, "toggle", () => {
        const position = detailAnchors.get(detail);
        detailAnchors.delete(detail);
        syncLayout(position?.anchor, position?.top);
      });
    });

    // Source notes and a modal keep evidence in place instead of routing away.
    qa(root, "[data-open-sources]").forEach((link) =>
      on(link, "click", () => {
        q(root, "#work-sources").open = true;
      }),
    );
    const dialog = q(root, ".ws-original-dialog");
    const image = q(root, "[data-original-image]");
    const imageStatus = q(root, "[data-image-status]");
    const originalButton = q(root, "[data-open-original]");
    let imageRequested = false;
    function closeDialog() {
      dialog.close();
      originalButton.focus({ preventScroll: true });
    }
    on(originalButton, "click", () => {
      if (typeof dialog.showModal !== "function") {
        announce(
          "This browser does not support the original-screen dialog. The source is giles.io/work/mixo/.",
        );
        return;
      }
      dialog.showModal();
      if (!imageRequested) {
        imageRequested = true;
        imageTimer = window.setTimeout(() => {
          if (!image.complete || image.naturalWidth === 0)
            imageStatus.textContent =
              "The original image could not be loaded. An internet connection to giles.io is needed for this image. The interactive reconstruction and all case-study content remain available.";
        }, 8000);
        image.src = image.dataset.src;
      }
    });
    on(image, "load", () => {
      clearTimeout(imageTimer);
      image.hidden = false;
      imageStatus.hidden = true;
    });
    on(image, "error", () => {
      clearTimeout(imageTimer);
      image.hidden = true;
      imageStatus.hidden = false;
      imageStatus.textContent =
        "The original screenshot is unavailable offline. Its source is giles.io/work/mixo-prompt.webp. The interactive reconstruction and all project content are available without it.";
    });
    on(q(root, "[data-close-original]"), "click", closeDialog);
    on(dialog, "click", (event) => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        closeDialog();
    });
    on(dialog, "close", () => {
      originalButton.focus({ preventScroll: true });
    });
    // Optional active chapter tracking. Native anchors still work without it.
    let observer;
    if ("IntersectionObserver" in window) {
      const links = qa(root, ".ws-index a");
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((e) => e.isIntersecting);
          if (!visible.length) return;
          const id = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0].target.id;
          links.forEach((link) => {
            const current = link.getAttribute("href") === "#" + id;
            link.classList.toggle("is-current", current);
            if (current) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        },
        { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
      );
      qa(root, "#work-mixo, #work-mixvisor, #work-track-record").forEach(
        (node) => observer.observe(node),
      );
    }
    root.dataset.enhanced = "true";
    instances.set(root, () => {
      abort.abort();
      observer?.disconnect();
      clearTimeout(imageTimer);
      if (layoutFrame) cancelAnimationFrame(layoutFrame);
      instances.delete(root);
    });
  }
  function init(scope = document) {
    qa(scope, "[data-work-showcase]").forEach(mount);
  }
  function destroy() {
    [...instances.values()].forEach((cleanup) => cleanup());
  }
  window.GilesWorkShowcase = { init, destroy };
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", () => init(), { once: true });
  else init();
  document.addEventListener("astro:page-load", () => init());
  document.addEventListener("astro:before-swap", destroy);
})();
