'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Types', [{
      id: 1,
      description: 'Venda produtor',
      nature: 'Entrada',
      operator: '+',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      description: 'Venda afiliado',
      nature: 'Entrada',
      operator: '+',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      description: 'Comissão paga',
      nature: 'Saída',
      operator: '-',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
      description: 'Comissão recebida',
      nature: 'Entrada',
      operator: '+',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Types', null, {});
  }
};
