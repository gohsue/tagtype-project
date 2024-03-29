import { createSchema, createYoga } from 'graphql-yoga';
import { NextApiRequest, NextApiResponse } from 'next';

import { Session } from 'next-auth';
import fontORM from '../../server/orm/font_orm';
import fontTagORM from '../../server/orm/font_tag_orm';
import imageFontORM from '../../server/orm/image_font_orm';
import tagORM from '../../server/orm/tag_orm';
import userORM from '../../server/orm/user_orm';
import webFontORM from '../../server/orm/web_font_orm';

const typeDefs = `
    type User {
      id: Int!
      name: String
      email: String
      kakao_id: String!
      role: String
    }

    type Session {
      user: User!
      expires: String!
    }

    type Query {
      session: Session
    }

    type Font {
        id: Int
        name: String
        description: String
        corporation: String
        is_web_font: Boolean
        fontTags: [FontTag]
        webFont: WebFont
        imageFont: ImageFont
    }

    type Tag {
        id: Int
        name: String
        fontTags: [FontTag]
    }

    type FontTag {
        id: Int
        font_id: Int
        fonts: Font
        tag_id: Int
        tags: Tag
    }

    type WebFont {
        id: Int
        font_id: Int
        source: String
        font: Font
    }

    type ImageFont {
        id: Int
        font_id: Int
        title: String
        unit: String
        detail_mobile: String
        detail_pc: String
        font: Font
    }

    type Query {
        getFontByFontId(font_id: Int): Font
        getFontAll: [Font!]!
        getFontsByTagId(tag_ids: [Int]): [Font]
        getFontsByCorpAndText(corporation: String, text: String): [Font]
        getCorporationAll: [Font]
        getTagAll: [Tag!]!
        getTagsByTagId(tag_ids: [Int]): [Tag]
        getFontTagAll: [FontTag]
        getFontTags(tag_ids: [Int]): [FontTag]
        getWebFontByFontId: WebFont
        getWebFontAll: [WebFont]
        getImageFontByFontId: ImageFont
        getImageFontAll: [ImageFont]
    }

    type Mutation {
        createUser(name: String!, email: String!, kakao_id: String!): User
        createFontTag(font_id: Int!, tag_id: Int!): FontTag
        deleteFontTag(id: Int!): FontTag
        updateFontTag(font_id: Int, tag_id: Int): Boolean
        createWebFont(
            name: String
            description: String
            corporation: String
            is_web_font: Boolean
            source: String
        ): WebFont
        updateWebFont(
            font_id: Int!
            name: String
            description: String
            corporation: String
            is_web_font: Boolean
            source: String
        ): Boolean
        createImageFont(
            name: String
            description: String
            corporation: String
            is_web_font: Boolean
            title: String
            unit: String
            detail_mobile: String
            detail_pc: String
        ): ImageFont
        updateImageFont(
            font_id: Int!
            name: String
            description: String
            corporation: String
            is_web_font: Boolean
            title: String
            unit: String
            detail_mobile: String
            detail_pc: String
        ): Boolean
        deleteFontByFontId(font_id: Int!): Boolean
        createTag(name: String): Tag
        updateTag(id: Int!, name: String): Tag
        deleteTagByTagId(tag_id: Int!): Boolean
    }
`;

const resolvers = {
  Query: {
    session(_source, _args, context) {
      return context.session ?? null;
    },
    getFontByFontId: (_, { font_id }) => fontORM.getFontByFontId({ font_id }),
    getFontAll: () => fontORM.getFontAll(),
    getFontsByTagId: (_, { tag_ids }) => fontORM.getFontsByTagId({ tag_ids }),
    getFontsByCorpAndText: (_, { corporation, text }) =>
      fontORM.getFontsByCorpAndText({ corporation, text }),
    getCorporationAll: () => fontORM.getCorporationAll(),

    getTagAll: () => tagORM.getTagAll(),
    getTagsByTagId: (_, { tag_ids }) => tagORM.getTagsByTagId({ tag_ids }),

    getFontTagAll: () => fontTagORM.getFontTagAll(),
    getFontTags: (_, { tag_ids }) => fontTagORM.getFontTags({ tag_ids }),

    getWebFontAll: () => webFontORM.getWebFontAll(),
    getImageFontAll: () => imageFontORM.getImageFontAll(),
  },
  Mutation: {
    createUser: (_, { name, email, kakao_id }) =>
      userORM.createUser({ name, email, kakao_id }),

    createFontTag: (_, { font_id, tag_id }) =>
      fontTagORM.createFontTag({ font_id, tag_id }),
    deleteFontTag: (_, { id }) => fontTagORM.deleteFontTag({ id }),
    updateFontTag: (_, { font_id, tag_id }) =>
      fontTagORM.updateFontTag({ font_id, tag_id }),

    createWebFont: (
      _,
      { name, description, corporation, is_web_font, source }
    ) =>
      webFontORM.createWebFont({
        name,
        description,
        corporation,
        is_web_font,
        source,
      }),
    updateWebFont: (
      _,
      { font_id, name, description, corporation, is_web_font, source }
    ) =>
      webFontORM.updateWebFont({
        font_id,
        name,
        description,
        corporation,
        is_web_font,
        source,
      }),

    createImageFont: (
      _,
      {
        name,
        description,
        corporation,
        is_web_font,
        title,
        unit,
        detail_mobile,
        detail_pc,
      }
    ) =>
      imageFontORM.createImageFont({
        name,
        description,
        corporation,
        is_web_font,
        title,
        unit,
        detail_mobile,
        detail_pc,
      }),
    updateImageFont: (
      _,
      {
        font_id,
        name,
        description,
        corporation,
        is_web_font,
        title,
        unit,
        detail_mobile,
        detail_pc,
      }
    ) =>
      imageFontORM.updateImageFont({
        font_id,
        name,
        description,
        corporation,
        is_web_font,
        title,
        unit,
        detail_mobile,
        detail_pc,
      }),
    deleteFontByFontId: (_, { font_id }) =>
      fontORM.deleteFontByFontId({ font_id }),
    createTag: (_, { name }) => tagORM.createTag({ name }),
    updateTag: (_, { id, name }) => tagORM.updateTag({ id, name }),
    deleteTagByTagId: (_, { tag_id }) => tagORM.deleteTagByTagId({ tag_id }),
  },
  User: {
    id(source) {
      return source;
    },
  },
};

const schema = createSchema<
  {
    req: NextApiRequest;
    res: NextApiResponse;
  } & { session: Session }
>({ resolvers, typeDefs });

export default createYoga<
  {
    req: NextApiRequest;
    res: NextApiResponse;
  },
  { session: Session }
>({
  // context: async ({ req }) => {
  //   const session = await getSession({ req });
  //   console.log('sessionreq', session);
  //   if (session === null) {
  //     throw new Error('No session found');
  //   }

  //   return {
  //     session,
  //   };
  // },
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
  graphiql: process.env.NODE_ENV !== 'production',
});

export const config = {
  api: {
    bodyParser: false,
  },
};
