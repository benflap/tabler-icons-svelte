import { SvelteComponentTyped } from "svelte";

type TablerIconProps = {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
    class?: string;
};

class TablerIcon extends SvelteComponentTyped<TablerIconProps> {}
