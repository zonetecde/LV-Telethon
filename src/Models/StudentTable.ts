import {
	DataTypes,
	Model,
	type InferAttributes,
	type InferCreationAttributes,
	type CreationOptional
} from '@sequelize/core';

import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';

/**
 * Table 'Student' contenant les élèves
 * @param id Identifiant de l'élève
 * @param nom Nom de l'élève
 * @param prenom Prénom de l'élève
 * @param classe Classe de l'élève
 * @param projectId Identifiant du projet auquel l'élève appartient
 */
export default class StudentTable extends Model<
	InferAttributes<StudentTable>,
	InferCreationAttributes<StudentTable>
> {
	@Attribute(DataTypes.INTEGER)
	@PrimaryKey
	@AutoIncrement
	declare id: CreationOptional<number>;

	@Attribute(DataTypes.STRING)
	@NotNull
	declare nom: string;

	@Attribute(DataTypes.STRING)
	@NotNull
	declare prenom: string;

	@Attribute(DataTypes.STRING)
	@NotNull
	declare classe: string;

	@Attribute(DataTypes.INTEGER)
	@NotNull
	declare projectId: number;
}
