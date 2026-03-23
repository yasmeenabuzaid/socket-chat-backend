'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Conversation.hasMany(models.Message, {
        foreignKey: 'conversationId',
        as: 'messages'
      });
    }
  }
  Conversation.init({
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};