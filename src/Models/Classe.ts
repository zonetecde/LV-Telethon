export default class Classe {
	niveau: 'Seconde' | 'Première' | 'Terminale';
	nombre: Number;

	constructor(niveau: 'Seconde' | 'Première' | 'Terminale', nombre: Number) {
		this.niveau = niveau;
		this.nombre = nombre;
	}
}
