import fs from "node:fs";
import path, { dirname } from "node:path";
import prettier, { format } from "prettier";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SOURCE_ICONS_PATH = path.resolve(
    __dirname,
    "../node_modules/@tabler/icons/icons/"
);
const DIST_PATH = path.resolve(__dirname, "../");
const DESTINATION_ICONS_PATH = path.resolve(__dirname, "../icons");
const TYPES_PATH = path.resolve(DIST_PATH, "types");

const prettierOptions = prettier.resolveConfig(__dirname);

function pascalCase(string: string) {
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

function createDir(path: string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

function findIcons() {
    return fs
        .readdirSync(SOURCE_ICONS_PATH)
        .filter((file) => file.endsWith(".svg"));
}

function createComponentName(originalName: string) {
    return (
        pascalCase(originalName)
            // A digit at the beginning of component name is not allowed
            .replace(/^2fa/, "TwoFA")
            .replace(/^3d/, "ThreeD")
    );
}

function removeOldComponents() {
    const components = fs.readdirSync(DESTINATION_ICONS_PATH);
    for (const file of components) {
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

        const [, svgContent] =
            /<svg[^>]*>([\s\S]*?)<\/svg>/.exec(svgFileContents) ?? [];

        let source = getComponentTemplate()
            .replace(/%%SVG_CONTENT%%/g, svgContent)
            .replace(/%%ORIGINAL_NAME%%/g, originalName);

        fs.writeFileSync(
            path.resolve(DESTINATION_ICONS_PATH, `${componentName}.svelte`),
            format(source, { parser: "svelte", ...(await prettierOptions) })
        );
    }
}

async function createIndexFile() {
    const exports = findIcons().map((file) => {
        const [originalName] = file.split(".");
        const componentName = createComponentName(originalName);

        return `export { default as ${componentName} } from "./icons/${componentName}.svelte"`;
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

        return `export class ${componentName} extends TablerIcon {}`;
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

removeOldComponents();
generateNewComponents();

createIndexFile();
createTypesFile();
createDocFile();
