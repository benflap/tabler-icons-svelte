# tabler-icons-svelte

[![npm version][npm-version]][npm]
[![npm downloads][npm-downloads]][npm]
[![MIT License][license]](LICENSE)

A library of Svelte components for [Tabler Icons](https://github.com/tabler/tabler-icons).

> A set of over 1250 free MIT-licensed high-quality SVG icons for you to use in your web projects. Each icon is designed on a 24x24 grid and a `2px` stroke.

## Installation

```sh
# yarn
yarn add tabler-icons-svelte --dev

# npm
npm install tabler-icons-svelte  --save-dev
```

`tabler-icons-svelte` needs to be added as a dev dependency as Svelte [requires original component source](https://github.com/sveltejs/sapper-template#using-external-components)

## Usage

Import components inside of the `<script>` and use like any other Svelte component.

Find icons:

-   Search on [tabler-icons.io](https://tabler-icons.io/)
-   View [component names](ICON_INDEX.md)

### Import Components From Package

The easiest way to use the icon components is by importing them from the package.

```svelte
<script>
    import { CurrencyBitcoin, BrandGithub, CircleX } from "tabler-icons-svelte";
</script>

<CurrencyBitcoin />
<BrandGithub />
<CircleX />
```

### Import Components From File

If your build times are high, import the components from their svelte files.

```svelte
<script>
    import Volume2 from "tabler-icons-svelte/icons/Volume2.svelte";
    import CurrencyBitcoin from "tabler-icons-svelte/icons/CurrencyBitcoin.svelte";
</script>

<Volume2 />
<CurrencyBitcoin size="2rem" />
```

## Props

The components each accept 3 props:

| Prop        | Default        |
| ----------- | -------------- |
| size        | 24             |
| color       | `currentColor` |
| strokeWidth | 2              |

## Development Workflow

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)

[npm]: https://www.npmjs.com/package/tabler-icons-svelte
[npm-version]: https://img.shields.io/npm/v/tabler-icons-svelte
[npm-downloads]: https://img.shields.io/npm/dw/tabler-icons-svelte
[license]: https://img.shields.io/github/license/benflap/tabler-icons-svelte
