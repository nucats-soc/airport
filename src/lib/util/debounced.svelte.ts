export function debounce<T>(f: (...args: T[]) => unknown, ms: number) {
	let id: ReturnType<typeof setTimeout> | null = null;
	return (...args: T[]) => {
		if (id !== null) {
			clearTimeout(id);
		}
		id = setTimeout(() => {
			f(...args);
		}, ms);
	};
}

export function debounced<T>(stateGetter: () => T, ms: number) {
	let state = $state(stateGetter());
	const update = debounce<T>((v) => (state = v), ms);
	$effect(() => update(stateGetter()));

	return () => state;
}
