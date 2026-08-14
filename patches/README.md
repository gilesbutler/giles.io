# `patches/`

`patch-package` patches applied on top of installed npm packages. Each `*.patch`
file is reapplied automatically on every `npm install` via the
`postinstall: patch-package` script in `package.json`.

## `astro-agent-annotate+0.0.2.patch`

Fixes a runtime bug in the published `astro-agent-annotate@0.0.2` package
(https://github.com/robertvanhoesel/astro-agent-annotate) that prevents the
toolbar app from loading under Astro's package-exports resolution.

### What it changes

`addDevToolbarApp({ entrypoint: fileURLToPath(new URL("./app.js", import.meta.url)) })`
becomes
`addDevToolbarApp({ entrypoint: "astro-agent-annotate/app" })`.

The first form hands Astro a filesystem path (`file:///.../dist/app.js`).
Astro passes that to Vite's `resolveId`, which honors the package's
`exports` field and rejects the path because `./app.js` is not a listed
subpath — only `./app` is. The dev server then logs:

```
"./app.js" is not exported under the conditions
["module", "browser", "development", "astro", "import"]
from package .../node_modules/astro-agent-annotate
```

and the `astro-agent-annotate` app icon never finishes loading.

The second form hands Astro a bare specifier. Vite's resolver matches it
against the `./app` subpath in the exports field and loads `dist/app.js`
correctly.

### What is NOT fixed by this patch

- The package's declared peer range is `"astro": "^4.0.0 || ^5.0.0"`.
  Install on Astro 7 needs `--legacy-peer-deps` (or a peer-range bump
  upstream; issue #8 requests `^6` but doesn't yet cover `^7`).
- On Astro 7 the compiler (`@astrojs/compiler-rs` 0.2.2) no longer injects
  `data-astro-source-file="..."` as a per-element HTML attribute; the
  source path is passed as an argument to `$$createComponent` instead.
  The plugin's runtime `MutationObserver` reads that attribute, so the
  `src/path/File.astro:line:col` line in copied markdown is empty on
  Astro 7. Notes and copy still work; only the source line is missing.

### Reverting

Delete this directory, run `npm uninstall patch-package`, and remove
`"postinstall": "patch-package"` from `package.json`.
