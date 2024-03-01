import * as Icons from './icons.js';

import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';

export type Route = {
	title: string;
	label: string;
	href: string;
	icon: ComponentType<Icon>;
	variant: 'default' | 'ghost' | 'outline';
};

export const primaryRoutes: Route[] = [
	{
		title: 'Home',
		label: '',
		href: '/',
		icon: Icons.Home,
		variant: 'outline'
	},
	{
		title: 'Agenda',
		label: '',
		href: '/agenda',
		icon: Icons.CalendarClock,
		variant: 'ghost'
	},
	{
		title: 'Cijfers',
		label: '2',
		href: '/cijfers',
		icon: Icons.GraduationCap,
		variant: 'ghost'
	},
	{
		title: 'Huiswerk',
		label: '5',
		href: '/huiswerk',
		icon: Icons.CheckCircle,
		variant: 'ghost'
	},
	{
		title: 'Presentie',
		label: '',
		href: '/presentie',
		icon: Icons.UserCheck,
		variant: 'ghost'
	},
];

export const secondaryRoutes: Route[] = [
	{
		title: 'Boeken',
		label: '',
		href: '/boeken',
		icon: Icons.BookText,
		variant: 'ghost'
	},
	{
		title: 'Keuze uren',
		label: '',
		href: '/keuze-uren',
		icon: Icons.CircleDot,
		variant: 'ghost'
	},
	{
		title: 'Docenten',
		label: '',
		href: '/docenten',
		icon: Icons.Users,
		variant: 'ghost'
	},
	{
		title: 'Mail',
		label: '3',
		href: '/mail',
		icon: Icons.Mail,
		variant: 'ghost'
	},
];

export const footerRoutes: Route[] = [
	{
		title: 'Instellingen',
		label: '',
		href: '/settings',
		icon: Icons.Settings,
		variant: 'ghost'
	},
];
