# tabler-icons-svelte

[![npm version][npm-version]][npm]
[![MIT License][license]](LICENCE)

<!-- [![npm downloads][npm-downloads]][npm] -->

A library of Svelte components for [Tabler Icons](https://github.com/tabler/tabler-icons).

> A set of over 850 free MIT-licensed high-quality SVG icons for you to use in your web projects. Each icon is designed on a 24x24 grid and a `2px` stroke.

## Installation

```sh
# yarn
yarn add tabler-icons-svelte --dev

# npm
npm install tabler-icons-svelte  --save-dev
```

`tabler-icons-svelte` needs to be added as dev dependency as Svelte [requires original component source](https://github.com/sveltejs/sapper-template#using-external-components)

## Usage

Import components inside of the `<script>` and use like any other Svelte component.

### One

```svelte
<script>
    import Volume2 from "tabler-icons-svelte";
</script>

<Volume2 />
```

### More Than One

```svelte
<script>
    import { CurrencyBitcoin, BrandGithub, CircleX } from "tabler-icons-svelte";
</script>

<CurrencyBitcoin />
<BrandGithub />
<CircleX />
```

[View all component names](ICON_INDEX.md)

## Props

The components each accept 3 props:

| Prop        | Default |
| ----------- | ------- |
| size        | 24      |
| color       | #000000 |
| strokeWidth | 2       |

## License

[MIT](LICENSE)

[npm]: https://www.npmjs.com/package/tabler-icons-svelte
[npm-version]: https://img.shields.io/npm/v/tabler-icons-svelte
[npm-downloads]: https://img.shields.io/npm/dw/tabler-icons-svelte
[license]: https://img.shields.io/github/license/benflap/tabler-icons-svelte
