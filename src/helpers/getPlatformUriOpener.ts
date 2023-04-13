export function getPlatformUriOpener() {
	switch (process.platform) {
		// MacOS not tested
		case 'darwin':
			return 'open';
		// Works in cmd and posh
		case 'win32':
			return 'start';
		// Tested in WSL; Requires xdg-utils and wslu if not installed, I'm mostly sure..?
		// Not tested in a real linux env so..
		case 'linux':
		default:
			return 'xdg-open';
	}
}
