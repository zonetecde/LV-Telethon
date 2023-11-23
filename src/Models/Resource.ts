export default class Resource {
	id: number | undefined;
	projectId: number;
	nomFichier: string;
	path: string;
	Type: 'video' | 'audio' | 'image' | 'other';
	IsMainRessource: boolean;

	constructor(
		projectId: number,
		nomFichier: string,
		path: string,
		isMainRessource: boolean,
		type: 'video' | 'audio' | 'image' | 'other'
	) {
		this.projectId = projectId;
		this.nomFichier = nomFichier;
		this.path = path;
		this.IsMainRessource = isMainRessource;
		this.Type = type;
	}
}
