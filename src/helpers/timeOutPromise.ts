export async function timeOutPromise<T>(
	promise: Promise<T>,
	timeoutMs: number,
) {
	const to = new Promise<never>((_, reject) =>
		setTimeout(() => reject(new Error('Timed out')), timeoutMs),
	);

	return Promise.race([promise, to]);
}
