const { ApolloError } = require("apollo-server-micro");
const { Op } = require("sequelize");
const font = require("../models/font");
const { FontTag, Font, Tag } = require("../models/index");
const tag = require("../models/tag");

const fontTagORM = {
  getFontTagAll: () =>
    FontTag.findAll({
      include: [
        {
          model: Font,
          as: "fonts",
        },
        {
          model: Tag,
          as: "tags",
        },
      ],
    }).then((data) => data),

  getFontTags: ({ tag_ids }) => {
    console.log(tag_ids);
    console.log(`${typeof (tag_ids)}`);
    const newFontTags = FontTag.findAll({
      where: {
        tag_id: {
          [Op.or]: tag_ids,
        },
      },
      include: [
        {
          model: Font,
          as: "fonts",
        },
        {
          model: Tag,
          as: "tags",
        },
      ],
    });

    return newFontTags;
  },

  createFontTag: async ({ font_id, tag_id }) => {
    if (await exists(font_id, tag_id)) throw new ApolloError("Data already exists.", "BAD_INPUT", { status: 400, error: true });

    const newFontTag = await FontTag.create({
      font_id,
      tag_id,
    });

    return newFontTag;
  },

  deleteFontTag: async ({ id }) => {
    await FontTag.destroy({
      where: { id: id },
    }).then((data) => data);
  },
};

const exists = async (font_id, tag_id) =>
  await FontTag.findOne({ where: { font_id: font_id, tag_id: tag_id } })
    .then((data) => data !== null)
    .then((existsData) => existsData);

module.exports = fontTagORM;
