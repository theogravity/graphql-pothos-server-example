import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';

import { GQLContext } from '../app';
import Post from '../db/models/Post.model';

export class PostsDatasource extends DataSource {
  context: GQLContext;

  constructor() {
    super();
    this.context = null as never;
  }

  async getPostById(id: number): Promise<Post | null> {
    return Post.findByPk(id, { [EXPECTED_OPTIONS_KEY]: this.context.db });
  }

  async getPostsByAuthorId(authorId: number): Promise<Post[]> {
    return Post.findAll({
      where: {
        authorId,
      },
      [EXPECTED_OPTIONS_KEY]: this.context.db,
    });
  }

  async listPosts(): Promise<Post[]> {
    return Post.findAll({ [EXPECTED_OPTIONS_KEY]: this.context.db });
  }

  async createPost({
    authorId,
    title,
    content,
  }: {
    authorId: number;
    title: string;
    content: string;
  }): Promise<Post> {
    const post = new Post();
    post.authorId = authorId;
    post.title = title;
    post.content = content;
    await post.save();
    return post;
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
