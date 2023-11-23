import {
	DataTypes,
	Model,
	type InferAttributes,
	type InferCreationAttributes,
	type CreationOptional
} from '@sequelize/core';

import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';

export default class StudentTable extends Model<
	InferAttributes<StudentTable>,
	InferCreationAttributes<StudentTable>
> {
	@Attribute(DataTypes.INTEGER)
	@PrimaryKey
	@AutoIncrement
	declare id: CreationOptional<number>;

	@Attribute(DataTypes.INTEGER)
	@NotNull
	declare nom: string;

	@Attribute(DataTypes.INTEGER)
	@NotNull
	declare prenom: string;

	@Attribute(DataTypes.INTEGER)
	@NotNull
	declare classe: string;

	@Attribute(DataTypes.INTEGER)
	@NotNull
	declare projectId: number;
}
