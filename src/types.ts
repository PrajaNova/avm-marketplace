export interface RegistryPlugin {
  name: string;
  description: string;
  section_label: string;
  repo: string;
}

export interface RegistryFile {
  schema_version: number;
  plugins: RegistryPlugin[];
}

export interface PluginDetail extends RegistryPlugin {
  iconName: string;
  category: 'Runtime' | 'SDK' | 'Language' | 'Tool';
  versionExample: string;
  envVars?: string[];
  keyCommands: {
    command: string;
    description: string;
  }[];
  sampleConfig?: string;
  highlights: string[];
}

export interface CliCommand {
  command: string;
  args?: string;
  description: string;
  category: 'Core' | 'Plugins' | 'Versions' | 'Aliases' | 'Shims' | 'Env';
  example: string;
  outputExample?: string;
}

export interface ComparisonItem {
  feature: string;
  avm: string;
  asdf: string;
  vfox: string;
  nvm: string;
}
