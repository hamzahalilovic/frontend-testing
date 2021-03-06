// react svg import requires this...

module.exports = ({ config }) => {
  const fileLoaderRule = config.module.rules.find(
    (rule) => !Array.isArray(rule.test) && rule.test.test(".svg")
  );
  fileLoaderRule.exclude = /\.svg$/;
  config.module.rules.push({
    test: /\.svg$/,
    use: ["@svgr/webpack", "url-loader"],
  });
  return config;
};


/*
module.exports = {
  stories: ['../src/components/**/*.stories.js'],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: custom.module.rules,
      },
      resolve: {
        ...config.resolve,
        ...custom.resolve,
      }
    };
  },
};
*/
/*
  const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));

const assetLoader = {
  loader: assetRule.loader,
  options: assetRule.options || assetRule.query,
};

// Merge our rule with existing assetLoader rules
config.module.rules.unshift({
  test: /\.svg$/,
  use: ["@svgr/webpack", assetLoader],
});

*/
