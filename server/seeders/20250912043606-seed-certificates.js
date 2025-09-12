'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('certificates', [
    {
      student_roll_no: 'CS001',
      certificate_name: 'AI Workshop',
      certificate_type: 'Participation',
      issued_by: 'IIT Madras',
      issue_date: new Date('2023-08-15'),
      description: 'Attended 3-day AI Workshop',
      file_url: 'http://example.com/certificates/ai-workshop.pdf',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      student_roll_no: 'CS002',
      certificate_name: 'Full Stack Internship',
      certificate_type: 'Internship',
      issued_by: 'OpenAI',
      issue_date: new Date('2023-05-20'),
      description: 'Completed summer internship in web development',
      file_url: 'http://example.com/certificates/internship.pdf',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('certificates', null, {});
}
