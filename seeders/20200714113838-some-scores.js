"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "scores",
      [
        {
          playerId: 1,
          categoryId: 1,
          score: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playerId: 1,
          categoryId: 2,
          score: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playerId: 1,
          categoryId: 2,
          score: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playerId: 2,
          categoryId: 1,
          score: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playerId: 2,
          categoryId: 1,
          score: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          playerId: 2,
          categoryId: 2,
          score: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("scores", null, {});
  },
};
