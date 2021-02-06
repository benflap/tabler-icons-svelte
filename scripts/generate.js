const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const { format } = prettier;

const SOURCE_ICONS_PATH = path.resolve(
    __dirname,
    "../node_modules/@tabler/icons/icons/"
);
const DIST_PATH = path.resolve(__dirname, "../");
const DESTINATION_ICONS_PATH = path.resolve(__dirname, "../icons");

const prettierOptions = prettier.resolveConfig(__dirname);

function pascalCase(string) {
    return string
        .replace(/(^\w|-\w)/g, (letter) => letter.toUpperCase())
        .replace(/-/g, "");
}

function getComponentTemplate() {
    return fs.readFileSync(
        path.resolve(__dirname, "./component-template.svelte"),
        "utf8"
    );
}

function getTypesTemplate() {
    return fs.readFileSync(
        path.resolve(__dirname, "./types-template.d.ts"),
        "utf8"
    );
}

function getDocTemplate() {
    return fs.readFileSync(
        path.resolve(__dirname, "./ICON_INDEX_TEMPLATE.md"),
        "utf8"
    );
}

function createDir(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

function findIcons() {
    return fs
        .readdirSync(SOURCE_ICONS_PATH)
        .filter((file) => file.endsWith(".svg"));
}

function createComponentName(originalName) {
    return (
        pascalCase(originalName)
            // A digit at the beginning of component name is not allowed
            .replace("2fa", "TwoFA")
            .replace("3dCubeSphere", "ThreeDCubeSphere")
    );
}

function removeOldComponentsAndExportFiles() {
    const files = fs.readdirSync(DESTINATION_ICONS_PATH);

    for (const file of files) {
        fs.unlinkSync(path.join(DESTINATION_ICONS_PATH, file));
    }
}

async function generateNewComponents() {
    const exports = [];

    for (const file of findIcons()) {
        const [originalName] = file.split(".");
        const svgFileContents = fs.readFileSync(
            path.resolve(SOURCE_ICONS_PATH, file),
            "utf8"
        );

        const componentName = createComponentName(originalName);

        const [, svgContent] = /<svg[^>]*>([\s\S]*?)<\/svg>/.exec(
            svgFileContents
        );

        let source = getComponentTemplate()
            .replace(/%%SVG_CONTENT%%/g, svgContent)
            .replace(/%%ORIGINAL_NAME%%/g, originalName);

        fs.writeFileSync(
            path.resolve(DESTINATION_ICONS_PATH, `${componentName}.svelte`),
            format(source, { parser: "html", ...(await prettierOptions) })
        );
    }
}

async function generateExportFiles() {
    for (const file of findIcons()) {
        const [originalName] = file.split(".");
        const componentName = createComponentName(originalName);

        fs.writeFileSync(
            path.resolve(DESTINATION_ICONS_PATH, `${componentName}.js`),
            `import ${componentName} from "./${componentName}.svelte"\nexport default ${componentName}`
        );
        fs.writeFileSync(
            path.resolve(DIST_PATH, `./icons/${componentName}.d.ts`),
            format(
                `\
                    import { SvelteComponentTyped } from "svelte"
                    export default class ${componentName} extends SvelteComponentTyped<{
                        color?: string;
                        size?: string | number;
                        strokeWidth?: string | number;
                    }> {}
                `,
                {
                    parser: "typescript",
                    ...(await prettierOptions),
                }
            )
        );
    }
}

async function createIndexFile() {
    const exports = findIcons().map((file) => {
        const [originalName] = file.split(".");
        const componentName = createComponentName(originalName);

        return `export { default as ${componentName} } from "./icons/${componentName}.svelte";`;
    });

    fs.writeFileSync(
        path.resolve(DIST_PATH, "index.js"),
        format(exports.join("\n"), {
            parser: "babel",
            ...(await prettierOptions),
        })
    );
}

async function createTypesFile() {
    const exports = findIcons().map((file) => {
        const [originalName] = file.split(".");
        const componentName = createComponentName(originalName);

        return `\
            export class ${componentName} extends SvelteComponentTyped<{
                color?: string;
                size?: string | number;
                strokeWidth?: string | number;
            }> {}\
        `;
    });

    fs.writeFileSync(
        path.resolve(DIST_PATH, "index.d.ts"),
        format(getTypesTemplate() + exports.join("\n"), {
            parser: "typescript",
            ...(await prettierOptions),
        })
    );
}

async function createDocFile() {
    const rows = findIcons().map((file) => {
        const [originalName] = file.split(".");
        const componentName = createComponentName(originalName);

        return `| ${componentName} | ${originalName} |`;
    });

    fs.writeFileSync(
        path.resolve(__dirname, "../ICON_INDEX.md"),
        format(getDocTemplate() + rows.join("\n"), {
            parser: "markdown",
            ...(await prettierOptions),
        })
    );
}

createDir(DESTINATION_ICONS_PATH);

removeOldComponentsAndExportFiles();
generateNewComponents();
generateExportFiles();

createIndexFile();
createTypesFile();
createDocFile();
