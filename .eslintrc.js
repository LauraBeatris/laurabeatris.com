module.exports = {
  extends: [
    'plugin:react/recommended',
    'standard',
    'standard-react',
    'standard-jsx',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'next'
  ],
  plugins: [
    'import'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal'],
      'newlines-between': 'always-and-inside-groups'
    }],
    camelcase: 'off'
  },
  globals: {
    React: 'writable'
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: [
          '.ts',
          '.tsx'
        ]
      }
    }
  }
}
