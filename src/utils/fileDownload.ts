export interface FileDownload {
	metadata: {
		mimeType: string;
		size: number;
		fileName: string;
		fileExtension: string;
	};
	data: Buffer;
}
