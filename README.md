# JacobKnaack.me

Portfolio content and frontend code, built with React + Typescript + Vite.

## Static Content

The content displayed in this webpage is organized with the `public/` directory.

- All images assets are placed within the root of the folder.
- `content.json`: Text copy that is displayed on the page.  Organized by section heading and placed into arrays for paragraph seperation.
- `github.json`: The content for projects, and includes information pulled from Github,  at this moment all content is hardcoded, but future iteration should allow for dynamic data fetching.

## Usage

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Running the Project

- Install dependencies: `npm install`
- development mode: `npm run dev`
- create a static build: `npm run build`
- deploy the project to GitHub Pages: `npm run deploy`

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

