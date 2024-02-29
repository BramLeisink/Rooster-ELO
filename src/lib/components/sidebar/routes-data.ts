import * as Icons from './icons.js';

import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';

export type Route = {
	title: string;
	label: string;
	icon: ComponentType<Icon>;
	variant: 'default' | 'ghost';
};

export const primaryRoutes: Route[] = [
	{
		title: 'Home',
		label: '128',
		icon: Icons.Home,
		variant: 'default'
	},
	{
		title: 'Agenda',
		label: '',
		icon: Icons.CalendarClock,
		variant: 'ghost'
	},
	{
		title: 'Cijfers',
		label: '9',
		icon: Icons.GraduationCap,
		variant: 'ghost'
	},
	{
		title: 'Junk',
		label: '23',
		icon: Icons.ArchiveX,
		variant: 'ghost'
	},
	{
		title: 'Trash',
		label: '',
		icon: Icons.Trash2,
		variant: 'ghost'
	},
	{
		title: 'Archive',
		label: '',
		icon: Icons.Archive,
		variant: 'ghost'
	}
];

export const secondaryRoutes: Route[] = [
	{
		title: 'Social',
		label: '972',
		icon: Icons.Users,
		variant: 'ghost'
	},
	{
		title: 'Updates',
		label: '342',
		icon: Icons.AlertCircle,
		variant: 'ghost'
	},
	{
		title: 'Forums',
		label: '128',
		icon: Icons.MessagesSquare,
		variant: 'ghost'
	},
	{
		title: 'Shopping',
		label: '8',
		icon: Icons.ShoppingCart,
		variant: 'ghost'
	},
	{
		title: 'Promotions',
		label: '21',
		icon: Icons.Archive,
		variant: 'ghost'
	}
];

export const footerRoutes: Route[] = [
	{
		title: 'Settings',
		label: '',
		icon: Icons.Settings,
		variant: 'ghost'
	},
];
