/**
 * Modèle d'un projet
 */
export default class Project {
	projectName: string;
	projectDescription: string;

	constructor(projectName: string, projectDescription: string) {
		this.projectName = projectName;
		this.projectDescription = projectDescription;
	}
}
