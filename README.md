# avm-marketplace

The plugin registry `avm plugin add <name>` resolves against. `avm-cli`
fetches [`registry.json`](registry.json) from this repo's `main` branch (no
server, no API — just a file over `raw.githubusercontent.com`) to turn a
short name into a GitHub repo, then fetches that repo's **latest GitHub
Release** (a prebuilt binary, never source) for the current platform.

## Adding a plugin

Open a PR adding an entry to `registry.json`:

```json
{
  "name": "kotlin",
  "description": "One line describing what it manages",
  "section_label": "Kotlin",
  "repo": "yourname/avm-plugin-kotlin"
}
```

Requirements for `repo`:

- Its GitHub Releases must include an asset named
  `avm-plugin-<name>_<os>_<arch>.tar.gz` for each platform you support —
  `<os>` is `linux` or `darwin`, `<arch>` is `amd64` or `arm64` (matching
  avm's own release convention; avm itself only ships `darwin_arm64` for
  macOS — Apple Silicon only).
- Each archive contains exactly one file: the plugin executable, named
  `avm-plugin-<name>`.
- The executable speaks avm's plugin protocol (JSON-over-stdio commands:
  `manifest`, `versions`, `is-installed`, `installed-versions`,
  `executable-path`, `env-vars`, `install`, `uninstall`) — see
  `avm_plugin_api::runner` / `avm_plugin_api::protocol` in
  [PrajaNova/avm](https://github.com/PrajaNova/avm), or any of the
  `avm-plugin-{node,java,android}` repos, for the reference shape.

`avm plugin add <name>` works the moment your repo has one matching release
published — no changes needed on the avm side beyond the registry entry.
