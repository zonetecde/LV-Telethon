import {
	DataTypes,
	Model,
	type InferAttributes,
	type InferCreationAttributes,
	type CreationOptional
} from '@sequelize/core';

import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';

export default class FileTable extends Model<
	InferAttributes<FileTable>,
	InferCreationAttributes<FileTable>
> {
	@Attribute(DataTypes.INTEGER)
	@PrimaryKey
	@AutoIncrement
	declare id: CreationOptional<number>;

	@Attribute(DataTypes.INTEGER)
	@NotNull
	declare projectId: number;

	@Attribute(DataTypes.STRING)
	@NotNull
	declare nomFichier: string;

	@Attribute(DataTypes.STRING)
	@NotNull
	declare Path: string;

	@Attribute(DataTypes.BOOLEAN)
	@NotNull
	declare isImage: boolean;
}