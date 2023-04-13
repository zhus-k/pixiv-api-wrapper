export function escapeParams(string: string) {
	switch (process.platform) {
		// MacOS; never tested
		case 'darwin':
			return `'${string}'`;
		case 'win32':
			return `${string.replace(/&/g, '^&')}`;
		// Not tested
		case 'linux':
		default:
			return `"${string}"`;
	}
}
