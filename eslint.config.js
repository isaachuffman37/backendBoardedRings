const js = require('@eslint/js');

js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn'
    }
  };
