module.exports = {
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module',
        'ecmaFeatures': {
            'modules': true,
            'experimentalObjectRestSpread': true,
            'binaryLiterals': true,
            'objectLiteralShorthandProperties': true,
            'generators': true
        }
    },
    'env': {
        'node': true,
        'es6': true
    },
    'plugins': [
        '@typescript-eslint',
        'only-warn',
        'import',
    ],
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/warnings'
    ],
    'rules': {
        '@typescript-eslint/member-delimiter-style': 1,
        '@typescript-eslint/ban-ts-ignore': 1,
        'prefer-const': 1,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-empty-interface': 0,
        // because of bug with false positive on ts overloads
        'no-dupe-class-members': 'off',
        'lines-between-class-members': [
            1,
            'always',
            {
                'exceptAfterSingleLine': true
            }
        ],
        'no-extra-semi': 0,
        'space-infix-ops': 0,
        'indent': [
            'warn',
            4
        ],
        'linebreak-style': [
            'warn',
            'windows'
        ],
        'semi': [
            'warn',
            'always'
        ],
        'quotes': [
            'warn',
            'single'
        ],
        'consistent-return': 0,
        'newline-per-chained-call': 0,
        'no-bitwise': 0,
        'no-param-reassign': 0,
        'prefer-destructuring': 0,
        'no-unused-vars': 0,
        'prefer-template': 1,
        'import/no-extraneous-dependencies': [
            1,
            {
                'devDependencies': [
                    '**/eslint-config.js',
                    '**/*.spec.ts',
                    '**/*.spec.tsx'
                ]
            }
        ],
        'import/no-unresolved': 'off',
        'import/first': 'off',
        'import/extensions': 'off',
        'import/prefer-default-export': 0,
        'import/named': 'off',
        'max-len': [
            1,
            249,
            {
                'ignoreComments': true,
                'ignoreStrings': true
            }
        ],
        'no-use-before-define': 0,
        'function-paren-newline': 0,
        'object-curly-newline': 0,
        'arrow-parens': 0,
        'no-confusing-arrow': 'off',
        'no-restricted-globals': 'off',
        'no-restricted-syntax': 'off',
        'radix': 0,
        'no-plusplus': 0,
        'no-unused-expressions': 0,
        'no-console': 0,
        'no-prototype-builtins': 0,
        'one-var': 0,
        'one-var-declaration-per-line': 0,
        'linebreak-style': 'off',
        'no-undef': 0
    }
};