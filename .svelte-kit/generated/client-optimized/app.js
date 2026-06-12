export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33'),
	() => import('./nodes/34'),
	() => import('./nodes/35'),
	() => import('./nodes/36'),
	() => import('./nodes/37'),
	() => import('./nodes/38'),
	() => import('./nodes/39'),
	() => import('./nodes/40'),
	() => import('./nodes/41'),
	() => import('./nodes/42'),
	() => import('./nodes/43'),
	() => import('./nodes/44'),
	() => import('./nodes/45'),
	() => import('./nodes/46'),
	() => import('./nodes/47'),
	() => import('./nodes/48'),
	() => import('./nodes/49'),
	() => import('./nodes/50'),
	() => import('./nodes/51'),
	() => import('./nodes/52'),
	() => import('./nodes/53')
];

export const server_loads = [];

export const dictionary = {
		"/(app)": [8,[2]],
		"/(app)/admin": [9,[2,3]],
		"/(app)/admin/analytics": [10,[2,3]],
		"/(app)/admin/analytics/[tab]": [11,[2,3]],
		"/(app)/admin/evaluations": [12,[2,3]],
		"/(app)/admin/evaluations/[tab]": [13,[2,3]],
		"/(app)/admin/functions": [14,[2,3]],
		"/(app)/admin/functions/create": [15,[2,3]],
		"/(app)/admin/functions/edit": [16,[2,3]],
		"/(app)/admin/settings": [17,[2,3]],
		"/(app)/admin/settings/[tab]": [18,[2,3]],
		"/(app)/admin/users": [19,[2,3]],
		"/(app)/admin/users/[tab]": [20,[2,3]],
		"/auth": [50],
		"/(app)/automations": [21,[2]],
		"/(app)/automations/[id]": [22,[2]],
		"/(app)/calendar": [24,[2]],
		"/(app)/channels/[id]": [25,[2]],
		"/(app)/c/[id]": [23,[2]],
		"/error": [51],
		"/(app)/home": [26,[2,4]],
		"/(app)/notes": [27,[2,5]],
		"/(app)/notes/new": [29,[2,5]],
		"/(app)/notes/[id]": [28,[2,5]],
		"/(app)/playground": [30,[2,6]],
		"/(app)/playground/completions": [31,[2,6]],
		"/(app)/playground/images": [32,[2,6]],
		"/s/[id]": [52],
		"/watch": [53],
		"/(app)/workspace": [33,[2,7]],
		"/(app)/workspace/functions/create": [34,[2,7]],
		"/(app)/workspace/knowledge": [35,[2,7]],
		"/(app)/workspace/knowledge/create": [37,[2,7]],
		"/(app)/workspace/knowledge/[id]": [36,[2,7]],
		"/(app)/workspace/models": [38,[2,7]],
		"/(app)/workspace/models/create": [39,[2,7]],
		"/(app)/workspace/models/edit": [40,[2,7]],
		"/(app)/workspace/prompts": [41,[2,7]],
		"/(app)/workspace/prompts/create": [43,[2,7]],
		"/(app)/workspace/prompts/[id]": [42,[2,7]],
		"/(app)/workspace/skills": [44,[2,7]],
		"/(app)/workspace/skills/create": [45,[2,7]],
		"/(app)/workspace/skills/edit": [46,[2,7]],
		"/(app)/workspace/tools": [47,[2,7]],
		"/(app)/workspace/tools/create": [48,[2,7]],
		"/(app)/workspace/tools/edit": [49,[2,7]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';