'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('students', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    roll_no: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      validate: { isEmail: true },
    },
    phone: {
      type: Sequelize.STRING,
    },
    department: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    admission_date: {
      type: Sequelize.DATE,
    },
    address: {
      type: Sequelize.STRING,
    },
    guardian_name: {
      type: Sequelize.STRING,
    },
    guardian_phone: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM('Active', 'Inactive', 'Graduated', 'Suspended'),
      defaultValue: 'Active',
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('students');
}
