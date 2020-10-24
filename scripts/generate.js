const fs = require("fs");
const path = require("path");

const SOURCE_ICONS_PATH = path.resolve(
    __dirname,
    "../node_modules/tabler-icons/icons"
);
const DESTINATION_ICONS_PATH = path.resolve(__dirname, "../dist");

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

function removeOldComponents() {
    const components = fs
        .readdirSync(DESTINATION_ICONS_PATH)
        .filter((file) => file.endsWith(".svelte"));

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

        const [, svgContent] = /<svg[^>]*>([\s\S]*?)<\/svg>/.exec(
            svgFileContents
        );

        let source = getComponentTemplate()
            .replace(/%%SVG_CONTENT%%/g, svgContent)
            .replace(/%%ORIGINAL_NAME%%/g, originalName);

        fs.writeFileSync(
            path.resolve(DESTINATION_ICONS_PATH, `${componentName}.svelte`),
            source
        );
    }
}

async function createIndexFile() {
    const exports = findIcons().map((file) => {
        const [originalName] = file.split(".");
        const componentName = createComponentName(originalName);

        return `export { default as ${componentName} } from "./${componentName}.svelte"`;
    });

    fs.writeFileSync(
        path.resolve(DESTINATION_ICONS_PATH, "index.js"),
        exports.join("\n")
    );
}

removeOldComponents();
generateNewComponents();
createIndexFile();
