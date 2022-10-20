module.exports = {
  // Changes the load order of our stories. First loads the Intro page
  // automatically import all files ending in *.stories.js|mdx
  stories: [
    "../src/Intro.stories.mdx",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  staticDirs: ["../public"],
};
