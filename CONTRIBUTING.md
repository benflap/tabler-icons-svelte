# Contribute

## Development Workflow

There are effectivly only two files that create everything in this library.

-   [`component-template.svelte`](scripts/component-template.svelte)
-   [`generate.js`](scripts/generate.js)

After downloading this repo install the dependencies.

```sh
npm install
```

Edit either `component-template.svelte` or `generate.js`. Then generate the components.

```sh
npm run build
```

### Test

To test run `npm link`.

In another app’s folder run:

```sh
npm install path/to/tabler-icons-svelte
```

Then use the components to make sure they work.
