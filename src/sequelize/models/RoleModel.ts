import {
  DataTypes,
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';
import { UserModel } from './UserModel';

export class RoleModel extends Model<
  InferAttributes<RoleModel>,
  InferCreationAttributes<RoleModel>
> {
  declare id: string;
  declare name: string;
  declare description: string | undefined;

  declare getUsers: BelongsToManyGetAssociationsMixin<UserModel>;
}

export default (sequelize: Sequelize) => {
  RoleModel.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
    },
  );
};
