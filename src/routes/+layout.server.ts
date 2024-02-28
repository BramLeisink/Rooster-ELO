import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event:any) => {
	const layoutCookie = event.cookies.get('PaneForge:layout');
	const collapsedCookie = event.cookies.get('PaneForge:collapsed');

	let layout: number[] | undefined = undefined;
	let collapsed: boolean | undefined = undefined;

	layoutCookie && (layout = JSON.parse(layoutCookie));
	collapsedCookie && (collapsed = JSON.parse(collapsedCookie));

	return { layout, collapsed };
};
