import { ComparisonItem } from '../types';

export const COMPARISONS: ComparisonItem[] = [
  {
    feature: 'Runtime Model',
    avm: 'Native compiled Rust binary (<1ms overhead)',
    asdf: 'Ruby/Bash script harness with shell subshells',
    vfox: 'Rust shell-hook engine with Lua sandbox',
    nvm: 'Heavy Bash script sourced into shell'
  },
  {
    feature: 'Plugin Architecture',
    avm: 'Prebuilt native binaries fetched on-demand, JSON wire protocol',
    asdf: 'Bash scripts executed directly on host system',
    vfox: 'Lua scripts running inside embedded Lua runtime',
    nvm: 'Single-purpose (Node.js only, no plugin ecosystem)'
  },
  {
    feature: 'Tool Interception',
    avm: 'Static PATH shims in ~/.avm/shims + directory-aware dispatch',
    asdf: 'Shim scripts triggering bash environment re-eval',
    vfox: 'Shell hooks rewriting PATH on every directory cd',
    nvm: 'Shell function intercepting node/npm'
  },
  {
    feature: 'Unified Config',
    avm: '.avm.json handles aliases, env vars, and tool versions together',
    asdf: '.tool-versions (versions only)',
    vfox: '.tool-versions (versions only)',
    nvm: '.nvmrc (Node version only)'
  },
  {
    feature: 'Global Package Fallback',
    avm: 'Global packages (e.g. npm -g) accessible even with different local version',
    asdf: 'Isolated per-version; requires manual reshimming',
    vfox: 'Isolated per-version',
    nvm: 'Requires reinstalling global packages per Node version'
  },
  {
    feature: 'Project Scripts Integration',
    avm: 'Discovers package.json scripts automatically (e.g. `avm dev`)',
    asdf: 'None',
    vfox: 'None',
    nvm: 'None'
  },
  {
    feature: 'Missing Version Behavior',
    avm: 'Gracefully falls back to system binary with clear warning',
    asdf: 'Errors and blocks execution',
    vfox: 'Errors and blocks execution',
    nvm: 'Errors and blocks execution'
  }
];

export const INSTALL_METHODS = [
  {
    id: 'curl',
    name: 'Shell Script',
    tag: 'Recommended',
    command: 'curl -fsSL https://raw.githubusercontent.com/prajanova/avm/main/install.sh | bash',
    description: 'Auto-detects OS and CPU architecture (Apple Silicon / Intel Mac / Linux amd64 & arm64) and installs avm-bin.'
  },
  {
    id: 'brew',
    name: 'Homebrew',
    tag: 'macOS / Linux',
    command: 'brew install prajanova/tap/avm',
    description: 'Installs via Homebrew tap with automatic PATH and completions.'
  },
  {
    id: 'npm',
    name: 'npm / npx',
    tag: 'Node ecosystem',
    command: 'npm install -g @prajanova/avm',
    description: 'Installs global prebuilt binary wrapper through npm registry.'
  },
  {
    id: 'cargo',
    name: 'Cargo',
    tag: 'Rust developers',
    command: 'cargo install --git https://github.com/PrajaNova/avm.git crates/avm-cli',
    description: 'Builds and installs directly from source using the latest Rust compiler.'
  }
];

export const SHELL_SETUP_GUIDE = [
  {
    shell: 'zsh',
    file: '~/.zshrc',
    snippet: `echo 'eval "$(avm shell-init)"' >> ~/.zshrc\nsource ~/.zshrc`
  },
  {
    shell: 'bash',
    file: '~/.bashrc',
    snippet: `echo 'eval "$(avm shell-init)"' >> ~/.bashrc\nsource ~/.bashrc`
  },
  {
    shell: 'fish',
    file: '~/.config/fish/config.fish',
    snippet: `echo 'avm shell-init | source' >> ~/.config/fish/config.fish`
  }
];
