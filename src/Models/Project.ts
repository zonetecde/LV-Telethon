import type Resource from './Resource.js';
import type Student from './Student.js';

/**
 * Modèle d'un projet
 */
export default class Project {
	projectName: string;
	projectDescription: string;
	students: Student[];
	resources: Resource[];

	constructor(
		projectName: string,
		projectDescription: string,
		students: Student[],
		resources: Resource[]
	) {
		this.projectName = projectName;
		this.projectDescription = projectDescription;
		this.students = students;
		this.resources = resources;
	}
}
