import sequelize from '../sequelize/Sequelize';
import { UserModel } from '../sequelize/models/UserModel';
import { ModelStatic } from 'sequelize';
import { User } from '../types/UserTypes';
import { RoleModel } from '../sequelize/models/RoleModel';

const Model = sequelize.model('User') as ModelStatic<UserModel>;

class UserRepository {
  static async findByEmail(email: string): Promise<UserModel | null> {
    return Model.findOne({
      where: {
        email,
      },
    });
  }

  static async createUser(user: User): Promise<User> {
    const userModel = Model.build({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      hashedPassword: user.password as string, // safe to cast
    });
    const createdUser = await userModel.save();

    // Finding a good mapper lib to replace "UserMapper"
    const { id, email, firstName, lastName } = createdUser;
    return { id, email, firstName, lastName };
  }

  static findById(id: number) {
    return Model.findByPk(id);
  }

  static findByIdWithRoles(id: number) {
    return Model.findByPk(id, {
      include: RoleModel,
    });
  }
}

export default UserRepository;
