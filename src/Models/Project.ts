import {
	DataTypes,
	Model,
	type InferAttributes,
	type InferCreationAttributes,
	type CreationOptional
} from '@sequelize/core';

import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';

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
}
