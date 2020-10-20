# tabler-icons-svelte

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

#### One

```svelte
<script>
    import Volume2 from "tabler-icons-svelte";
</script>

<Volume2 />
```

#### More Than One

```svelte
<script>
    import { CurrencyBitcoin, BrandGithub, CircleX } from "tabler-icons-svelte";
</script>

<CurrencyBitcoin />
<BrandGithub />
<CircleX />
```
