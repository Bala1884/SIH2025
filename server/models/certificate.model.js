export default (sequelize, DataTypes) => {
  const Certificate = sequelize.define("Certificate", {
    student_roll_no: { type: DataTypes.STRING, allowNull: false },
    certificate_name: { type: DataTypes.STRING, allowNull: false },
    certificate_type: {
      type: DataTypes.ENUM(
        "Academic", "Achievement", "Participation",
        "Course Completion", "Internship", "Project", "Other"
      ),
      allowNull: false
    },
    issued_by: { type: DataTypes.STRING },
    issue_date: { type: DataTypes.DATE },
    description: { type: DataTypes.STRING },
    file_url: { type: DataTypes.STRING }
  }, { tableName: "certificates", timestamps: true });

  Certificate.associate = models => {
    Certificate.belongsTo(models.Student, { foreignKey: "student_roll_no", targetKey: "roll_no" });
  };

  return Certificate;
};
