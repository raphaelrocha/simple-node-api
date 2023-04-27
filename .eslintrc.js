module.exports = {
    root: true,
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'import',
        'prettier',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/no-shadow': ['error'],
                '@typescript-eslint/no-use-before-define': ['off'],
                '@typescript-eslint/no-non-null-assertion': ['off'],
                'import/prefer-default-export': ['off'],
                'no-shadow': 'off',
                'no-undef': 'off',
                'import/no-extraneous-dependencies': ['off'],
                'max-classes-per-file': ['off'],
                'no-param-reassign': ['warn'],
            },
        },
    ]
}
