/**
 * Modèle d'un étudiant
 * @param prenom Prénom de l'étudiant
 * @param nom Nom de l'étudiant
 * @param classe Classe de l'étudiant
 */
export default class Student {
	prenom: string;
	nom: string;
	classe: string;

	constructor(prenom: string, nom: string, classe: string) {
		this.prenom = prenom;
		this.nom = nom;
		this.classe = classe;
	}
}
