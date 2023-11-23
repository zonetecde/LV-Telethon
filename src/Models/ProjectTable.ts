import {
	DataTypes,
	Model,
	type InferAttributes,
	type InferCreationAttributes,
	type CreationOptional
} from '@sequelize/core';

import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';

/**
 * Table 'Project' contenant les projets des élèves
 * @param id Identifiant du projet
 * @param projectName Nom du projet
 * @param projectDescription Description du projet
 * @param hideStudentsNames Si les noms des élèves doivent être cachés
 */
export default class ProjectTable extends Model<
	InferAttributes<ProjectTable>,
	InferCreationAttributes<ProjectTable>
> {
	@Attribute(DataTypes.INTEGER)
	@PrimaryKey
	@AutoIncrement
	declare id: CreationOptional<number>;

	@Attribute(DataTypes.STRING)
	@NotNull
	declare projectName: string;

	@Attribute(DataTypes.STRING)
	declare projectDescription: string;

	@Attribute(DataTypes.BOOLEAN)
	@NotNull
	declare hideStudentsNames: boolean;
}
