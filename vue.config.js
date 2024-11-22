module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://lockitem-abaje5g7dagcbsew.canadacentral-01.azurewebsites.net',
          changeOrigin: true, // necesario para virtual hosted sites
          pathRewrite: { '^/api': '' },
        },
      }
    }
  };
  