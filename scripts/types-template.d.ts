import { SvelteComponentTyped } from "svelte";

type TablerIconProps = {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
    class?: string;
};

declare class TablerIcon extends SvelteComponentTyped<TablerIconProps> {}
