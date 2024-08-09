# node-app-template

A practical project template and recipe for a modern Node.js backend application project.

Requires Node.js 18+.

- TypeScript: run via `tsx`, build via `pkgroll`
- Native ESM
- Dotenv: multi env and encryption 
- ESLint + Prettier
- Jest

## Usage

```sh
git clone https://github.com/bisubus/node-app-template
cd node-app-template
npm run init -- --author=my-name --package=my-package
npm i
```

## Guide

A step-by-step recipe for customization.

### Initialization

Source files are located in `src/`, test files in `src/__test__`.

#### Repo

Empty initial commit makes a rebase easier.

```sh
git init
git commit --allow-empty -m Init
```

#### Package

```sh
npm init -y
npm pkg set type=module
npm pkg set name=my-package
npm pkg set author=my-name
npm i
```

Add [.gitignore](https://github.com/github/gitignore/blob/main/Node.gitignore).

Add [LICENSE](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) and update info.

### Environment

Add [env.ts](env.ts) to autoload `.env.*` files similarly to `dotenv-flow`.

```sh
npm i -D cross-env
npm i @dotenvx/dotenvx
```


Main `.env` file remains tracked, replace `.env*` entries in `.gitignore` with:

```
.env.keys
.env.local
.env.*.local
```

### TypeScript

```sh
npm i -D typescript @types/node
```

Initialize TS config:

```
npx tsc --init
```

Update `tsconfig.json`:

```json
"compilerOptions": {
  ...    
  "target": "es2023",
  "lib": ["es2023"],
  "module": "nodenext",
  "moduleResolution": "nodenext",
  "paths": { "@/*": ["./src/*"] },
  "typeRoots": ["./src/types", "./node_modules/@types"]
  "outDir": "./dist",
  "declarationDir": "./types",
  ...
},
"include": ["src", "env.ts"],
"exclude": ["node_modules"],


```
#### Running

The scripts to run the app by compiling TS on the fly:

```sh
npm i -D tsx
npm pkg set scripts.start="cross-env NODE_ENV=production node --import=tsx --import=./env.ts src/index.ts"
npm pkg set scripts.dev="node --import=tsx --import=./env.ts src/index.ts"
npm pkg set scripts.dev:debug="node --import=tsx --import=./env.ts --inspect-brk src/index.ts"
npm pkg set scripts.dev:watch="tsx watch --ignore !./src/**/* --clear-screen=false --import=./env.ts src/index.ts"
```

#### Bundling

The script to bundle the app for deployment:

```sh
npm i -D pkgroll@2.4.0
npm pkg set scripts.build="pkgroll --sourcemap --tsconfig=tsconfig.build.json"
```

Add `tsconfig.build.json`:

```json
{
  "compilerOptions": {
    "module": "es2022",
    "moduleResolution": "bundler"
  },
  "extends": "./tsconfig.json"
}
```

Add entry point to `package.json`:

```json
"exports": {
  "import": {
    "types": "./dist/index.d.mts",
    "default": "./dist/index.mjs"
  }
}
```

### ESLint

ESLint 8 for the compatibility with tools:

```sh
npm i -D eslint@8 @types/eslint@8 globals @eslint/js@8 typescript-eslint@7 prettier eslint-config-prettier eslint-plugin-prettier
```

Initialize flat config:

```sh
npx @eslint/create-config@1.1.0

√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · typescript
√ Where does your code run? · node
× Would you like to install them now? · No
```

Update [eslint.config.js](eslint.config.js) to add Prettier and customize the rules.

The scripts:

```sh
npm pkg set scripts.lint="eslint ."
npm pkg set scripts.lint:fix="eslint --fix ."
```

### Jest

```sh
npm i -D ts-jest @types/jest
npx ts-jest config:init
npm pkg set scripts.test="jest"
```

Update [jest.config.js](jest.config.js) to configure test file locations.
