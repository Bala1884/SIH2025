export default (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    roll_no: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    phone: { type: DataTypes.STRING },
    department: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.STRING, allowNull: false },
    admission_date: { type: DataTypes.DATE },
    address: { type: DataTypes.STRING },
    guardian_name: { type: DataTypes.STRING },
    guardian_phone: { type: DataTypes.STRING },
    status: {
      type: DataTypes.ENUM("Active", "Inactive", "Graduated", "Suspended"),
      defaultValue: "Active"
    }
  }, { tableName: "students", timestamps: true });

  Student.associate = models => {
    Student.hasMany(models.Certificate, { foreignKey: "student_roll_no", sourceKey: "roll_no" });
  };

  return Student;
};
