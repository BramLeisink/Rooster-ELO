import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: any) => {
	const dashboardLayoutCookie = event.cookies.get('Dashboard:layout');

	interface DashboardItem {
		id: `${string}-${string}-${string}-${string}-${string}`;
		x: number;
		y: number;
		w: number;
		h: number;
		component: string;
	}

	let layout: DashboardItem[] = [];

	dashboardLayoutCookie && (layout = JSON.parse(dashboardLayoutCookie));

	return { layout };
};
