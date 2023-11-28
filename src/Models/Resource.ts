/**
 * Modèle d'une ressource d'un projet
 * @param nomFichier Nom du fichier
 * @param Type Type du fichier (image, audio, vidéo, autre)
 * @param IsMainRessource Si la ressource est la ressource principale du projet; celle qui sera affichée en thumbnail
 */
export default class Resource {
	nomFichier: string;
	Type: 'video' | 'audio' | 'image' | 'text' | 'other';
	IsMainRessource: boolean;

	constructor(
		nomFichier: string,
		isMainRessource: boolean,
		type: 'video' | 'audio' | 'image' | 'text' | 'other'
	) {
		this.nomFichier = nomFichier;
		this.IsMainRessource = isMainRessource;
		this.Type = type;
	}
}
