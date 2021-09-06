import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';

import { GQLContext } from '../app';
import User from '../db/models/User.model';

export class UsersDatasource extends DataSource<GQLContext> {
  context: GQLContext;

  constructor() {
    super();
    this.context = null as never;
  }

  async getUserById(id: number): Promise<User | null> {
    return User.findByPk(id, { [EXPECTED_OPTIONS_KEY]: this.context.db });
  }

  async listUsers(): Promise<User[]> {
    return User.findAll({ [EXPECTED_OPTIONS_KEY]: this.context.db });
  }

  async createUser(name: string): Promise<User> {
    const user = new User();
    user.name = name;
    await user.save();

    return user;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config: DataSourceConfig<GQLContext>) {
    this.context = config.context;
  }
}
