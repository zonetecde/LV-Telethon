export default class File {
	id: number | undefined;
	projectId: number;
	nomFichier: string;
	path: string;
	isImage: boolean;
	isMainImage: boolean;

	constructor(
		projectId: number,
		nomFichier: string,
		path: string,
		isImage: boolean,
		isMainImage: boolean
	) {
		this.projectId = projectId;
		this.nomFichier = nomFichier;
		this.path = path;
		this.isImage = isImage;
		this.isMainImage = isMainImage;
	}
}
