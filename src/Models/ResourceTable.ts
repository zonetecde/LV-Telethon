import {
	DataTypes,
	Model,
	type InferAttributes,
	type InferCreationAttributes,
	type CreationOptional
} from '@sequelize/core';

import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';

/**
 * Table 'Resource' contenant les ressources des projets
 * @param id Identifiant de la ressource
 * @param projectId Identifiant du projet auquel la ressource appartient
 * @param nomFichier Nom du fichier
 * @param Path Chemin du fichier sur le serveur
 * @param Type Type du fichier (image, audio, vidéo, autre)
 * @param isMain Si la ressource est la ressource principale du projet; celle qui sera affichée en thumbnail
 */
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
	declare Type: string;

	@Attribute(DataTypes.BOOLEAN)
	@NotNull
	declare isMain: boolean;
}
