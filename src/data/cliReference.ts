import { CliCommand } from '../types';

export const CLI_COMMANDS: CliCommand[] = [
  // Core & Aliases
  {
    command: 'avm init',
    category: 'Core',
    description: 'Initializes an .avm.json configuration file in the current working directory.',
    example: 'avm init',
    outputExample: '✓ Initialized .avm.json'
  },
  {
    command: 'avm add',
    args: '[--global] <alias> <command>',
    category: 'Aliases',
    description: 'Adds an executable alias to local or global .avm.json configuration.',
    example: 'avm add dev "pnpm run dev --filter web"',
    outputExample: '✓ Added alias "dev" -> "pnpm run dev --filter web"'
  },
  {
    command: 'avm remove',
    args: '[--global] <alias>',
    category: 'Aliases',
    description: 'Removes an alias from the configuration file.',
    example: 'avm remove dev',
    outputExample: '✓ Removed alias "dev"'
  },
  {
    command: 'avm list',
    category: 'Core',
    description: 'Displays all merged aliases, environment variables, tools, and plugin commands in effect.',
    example: 'avm list',
    outputExample: `Aliases:
  dev       pnpm run dev (local)
  release   npm run release $1 (global)
Tools:
  node      22.14.0 (local)
  java      17.0.13+11 (global)
Env:
  NODE_ENV  development`
  },
  {
    command: 'avm which',
    args: '<alias-or-tool>',
    category: 'Core',
    description: 'Inspects origin, precedence, and resolved location/command for a tool or alias.',
    example: 'avm which node',
    outputExample: `Tool: node
Version: 22.14.0 (pinned locally in .avm.json)
Binary: ~/.avm/tools/node/22.14.0/bin/node`
  },
  {
    command: 'avm run',
    args: '<alias> [args...]',
    category: 'Aliases',
    description: 'Executes a configured alias with local environment and tool versions injected.',
    example: 'avm run dev --port 3000'
  },
  {
    command: 'avm resolve',
    args: '<alias> [args...]',
    category: 'Aliases',
    description: 'Expands and prints the exact shell command that would be executed.',
    example: 'avm resolve dev'
  },
  {
    command: 'avm env',
    category: 'Env',
    description: 'Prints shell-safe export statements for merged environment variables.',
    example: 'avm env',
    outputExample: `export NODE_ENV="development"
export JAVA_HOME="/Users/.../.avm/tools/java/openjdk-17.0.13+11"`
  },

  // Plugins
  {
    command: 'avm plugin add',
    args: '<name | org/repo | git-url>',
    category: 'Plugins',
    description: 'Fetches and installs a plugin binary from the marketplace registry or git repository.',
    example: 'avm plugin add node',
    outputExample: `Resolving "node" from marketplace registry...
Found PrajaNova/avm-plugin-node
Downloading release for darwin_arm64...
✓ Installed ~/.avm/plugins/avm-plugin-node/bin/avm-plugin`
  },
  {
    command: 'avm plugin list',
    category: 'Plugins',
    description: 'Lists all currently installed plugins and their discovery paths.',
    example: 'avm plugin list',
    outputExample: `Installed plugins:
  - node    (~/.avm/plugins/avm-plugin-node/bin/avm-plugin)
  - java    (~/.avm/plugins/avm-plugin-java/bin/avm-plugin)
  - android (~/.avm/plugins/avm-plugin-android/bin/avm-plugin)`
  },
  {
    command: 'avm plugin available',
    category: 'Plugins',
    description: 'Queries the marketplace registry and lists all installable plugins.',
    example: 'avm plugin available'
  },
  {
    command: 'avm plugin remove',
    args: '<name>',
    category: 'Plugins',
    description: 'Uninstalls an installed plugin binary from ~/.avm/plugins.',
    example: 'avm plugin remove java'
  },
  {
    command: 'avm plugin update',
    args: '<name>',
    category: 'Plugins',
    description: 'Checks for newer releases of the plugin and updates the binary.',
    example: 'avm plugin update node'
  },
  {
    command: 'avm create',
    args: '<plugin-name>',
    category: 'Plugins',
    description: 'Scaffolds a new Rust plugin crate with ToolProvider skeleton and GitHub Actions workflows.',
    example: 'avm create python',
    outputExample: '✓ Created plugin scaffold at ./avm-plugin-python'
  },

  // Version Management
  {
    command: 'avm <plugin> versions',
    category: 'Versions',
    description: 'Lists installable upstream versions for a plugin (e.g. node, java, android).',
    example: 'avm node versions'
  },
  {
    command: 'avm <plugin> <filter> versions',
    category: 'Versions',
    description: 'Filters available versions by major line or query.',
    example: 'avm node 20 versions'
  },
  {
    command: 'avm <plugin> latest versions',
    category: 'Versions',
    description: 'Shows the latest upstream version available for installation.',
    example: 'avm java latest versions'
  },
  {
    command: 'avm <plugin> use',
    args: '<version> [--global]',
    category: 'Versions',
    description: 'Sets the active version in local .avm.json (or global ~/.avm.json with --global).',
    example: 'avm node use 22.14.0'
  },
  {
    command: 'avm <plugin> install',
    args: '<version>',
    category: 'Versions',
    description: 'Downloads, extracts, and manages a runtime version.',
    example: 'avm java install 17'
  },
  {
    command: 'avm <plugin> uninstall',
    args: '<version>',
    category: 'Versions',
    description: 'Removes an installed runtime version from ~/.avm/tools/.',
    example: 'avm node uninstall 18.20.0'
  },

  // Shims & Shell
  {
    command: 'avm shell-init',
    category: 'Shims',
    description: 'Prints shell initialization script to hook PATH and shims into your shell session.',
    example: 'eval "$(avm shell-init)"'
  },
  {
    command: 'avm shims install',
    category: 'Shims',
    description: 'Regenerates shims for all managed tools in ~/.avm/shims.',
    example: 'avm shims install'
  },
  {
    command: 'avm shims path',
    category: 'Shims',
    description: 'Prints the absolute path to the avm shims directory.',
    example: 'avm shims path',
    outputExample: '~/.avm/shims'
  },
  {
    command: 'avm all',
    category: 'Core',
    description: 'Prints comprehensive grouped documentation of all aliases, plugins, commands, and shims.',
    example: 'avm all'
  }
];
