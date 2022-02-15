module.exports = {
  images: {
    domains: ["scontent-vie1-1.cdninstagram.com"],
  },

  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
};
