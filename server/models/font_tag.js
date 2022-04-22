const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) =>
sequelize.define(
    "FontTag",
    {
        font_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tag_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        charset: "utf8"
    }
);

