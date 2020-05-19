module.exports = function (api) {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          corejs: 3,
          modules: 'auto',
          useBuiltIns: 'entry'
        }
      ],
      '@babel/preset-react'
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3,
          helpers: true,
          regenerator: true
        }
      ],
      'add-module-exports',
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true
        }
      ],
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      ...(api.env('development')
        ? [
          'react-hot-loader/babel',
        ]
        : []),
    ],
  };
};
