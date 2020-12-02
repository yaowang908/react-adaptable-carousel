const path = require("path");

module.exports = {
  "stories": [ "../src/**/*.stories.(tsx|mdx)" ],
  webpackFinal: async config => {
        config.module.rules.push({
          test: /\.(ts|tsx)$/,
          include: path.resolve(__dirname, "../src/components"),
          use: [
              // There is also a second option in documentation to use babel instead of ts-loader which should also work
              {
                loader: require.resolve('ts-loader'),
              },
              {
                  loader: require.resolve('react-docgen-typescript-loader'),
                  options: {
                    tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
                  }
              }
          ],
        })
        config.resolve.extensions.push('.ts', '.tsx');
        return config
      },
  "addons": [
    '@storybook/addon-docs'
    // "@storybook/addon-links",
    // "@storybook/addon-essentials",
    // "@storybook/preset-create-react-app"
  ]
}