'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('certificates', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    student_roll_no: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'students', // must exist before this migration
        key: 'roll_no',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    certificate_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    certificate_type: {
      type: Sequelize.ENUM(
        'Academic',
        'Achievement',
        'Participation',
        'Course Completion',
        'Internship',
        'Project',
        'Other'
      ),
      allowNull: false,
    },
    issued_by: {
      type: Sequelize.STRING,
    },
    issue_date: {
      type: Sequelize.DATE,
    },
    description: {
      type: Sequelize.STRING,
    },
    file_url: {
      type: Sequelize.STRING,
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
  await queryInterface.dropTable('certificates');
}
