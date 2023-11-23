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

	/*
	 * Fichier annexe (ni une image, ni une vidéo) ?
	 */
	@Attribute(DataTypes.BOOLEAN)
	@NotNull
	declare IsFile: boolean;

	/*
	 * Est une image ?
	 */
	@Attribute(DataTypes.BOOLEAN)
	@NotNull
	declare isImage: boolean;

	/*
	 * Est une vidéo ?
	 */
	@Attribute(DataTypes.BOOLEAN)
	@NotNull
	declare isVideo: boolean;

	/*
	 * Est l'image ou la vidéo mis en couverture ? ?
	 */
	@Attribute(DataTypes.BOOLEAN)
	@NotNull
	declare isMain: boolean;
}
