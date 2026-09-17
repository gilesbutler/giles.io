export default {
  stories: [
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/landing-pages/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  staticDirs: ["../public"],
  addons: ["@storybook/addon-mcp"],
  framework: {
    name: "@storybook-astro/framework",
    options: {},
  },
  core: {
    allowedHosts: ["gb-dev-1.exe.xyz"],
  },
};
