import Root from './badge.svelte';
import { type VariantProps, tv } from 'tailwind-variants';
export const badgeVariants = tv({
base: 'focus-visible:ring-ring inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 transition-[color,box-shadow] gap-1 [&_svg]:pointer-events-none [&_svg]:size-3 gap-1 [&_svg]:size-3 overflow-hidden',
variants: {
variant: {
default: 'border-transparent bg-primary text-primary-foreground',
secondary: 'border-transparent bg-secondary text-secondary-foreground',
destructive: 'border-transparent bg-destructive text-destructive-foreground',
outline: 'text-foreground'
}
},
defaultVariants: { variant: 'default' }
});
export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
export { Root, Root as Badge };
