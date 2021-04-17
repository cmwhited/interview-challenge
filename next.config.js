const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

require('dotenv').config()

module.exports = (phase, { defaultConfig }) => {
  const config = {
    ...withBundleAnalyzer({
      webpack: (config) => {
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        })
        return config
      },
      env: {
        NETWORK_HTTP_URI: process.env.NETWORK_HTTP_URI,
      },
      exportPathMap: async function (defaultPathMap) {
        return defaultPathMap
      },
    }),
  }

  return {
    future: { webpack5: true },
    ...config,
  }
}
