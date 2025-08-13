## Getting Started

1. Install node.js
2. Check your Node.js version with `node --version`
3. Supported build version: 18+
4. Install dependencies with:

```shell
npm i
```

5. Start the project with:

```shell
npm run dev
```

6. Additional commands for working with the build:

- `npm run convert-rastr`: create WebP versions of raster images in the `source/img/`;
- `npm run dev` starts the development server;
- `npm run build`  builds an optimized version of the project into the `dist` folder;
- `npm run preview` launches a server with the optimized version;
- the sprite with icons is assembled from files in the `source/img/sprite/` folder;
- to access the sprite from `html` use the path `href="/__spritemap#sprite-{название файла иконки}"`;

7. In the `index.html` file in the `source` folder, you’ll find tips on the structure of your project.

## Self-checks

Pixel Perfect testing

You can run Pixel Perfect testing for your project with:

```shell
npm run test 
```

The testing framework accesses  `localhost:3000`, so the server must be running via `npm run dev`.
Run the testing command in a new terminal without closing the project’s server.

The project uses a number of additional tools for self-checking. Use them during development and before submitting your project:

- `npm run w3c`: checks HTML validity;
- `npm run linthtml`: checks markup according to linthtml rules;
- `npm run html-validate`: checks HTML;
- `npm run lint-bem`: checks BEM compliance;
- `npm run stylelint`: checks styles against stylelint rules;
- `npm run lint-js`: checks scripts against eslint rules;
- `npm run ls-lint`: checks file and folder naming;
- `npm run editorconfig`: checks editorconfig compliance.
