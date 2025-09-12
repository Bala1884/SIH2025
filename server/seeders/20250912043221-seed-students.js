'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('students', [
    {
      roll_no: 'CS001',
      name: 'Arun Kumar',
      email: 'arun.kumar@example.com',
      phone: '9876543210',
      department: 'Computer Science',
      year: '3',
      admission_date: new Date('2021-08-10'),
      address: 'Chennai, Tamil Nadu',
      guardian_name: 'Kumar',
      guardian_phone: '9123456780',
      status: 'Active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      roll_no: 'CS002',
      name: 'Divya Sharma',
      email: 'divya.sharma@example.com',
      phone: '9876501234',
      department: 'Information Technology',
      year: '2',
      admission_date: new Date('2022-08-12'),
      address: 'Bengaluru, Karnataka',
      guardian_name: 'Sharma',
      guardian_phone: '9988776655',
      status: 'Active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('students', null, {});
}
