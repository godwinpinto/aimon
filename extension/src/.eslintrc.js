module.exports = {
    // ...
    rules: {
      // ...
      //'@typescript-eslint/consistent-type-imports': 'error', // the replacement of "importsNotUsedAsValues": "error"
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
        },
      ], // the replacement of "importsNotUsedAsValues": "error"
    },
  };