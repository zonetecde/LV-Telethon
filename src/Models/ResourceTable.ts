import {
	DataTypes,
	Model,
	type InferAttributes,
	type InferCreationAttributes,
	type CreationOptional
} from '@sequelize/core';

import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';

export default class ResourceTable extends Model<
	InferAttributes<ResourceTable>,
	InferCreationAttributes<ResourceTable>
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

	@Attribute(DataTypes.STRING)
	@NotNull
	declare Type: 'video' | 'audio' | 'image' | 'other';

	@Attribute(DataTypes.BOOLEAN)
	@NotNull
	declare isMain: boolean;
}
