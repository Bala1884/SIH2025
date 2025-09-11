import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";
import { fileURLToPath } from "url";
import configFile from "../config/config.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";
const config = configFile[env];
const db = {};
try{
  const sequelize = new Sequelize('postgresql://admin:1234@54.173.57.28:5432/sih', {});
}catch(e){
  console.error(e.message);
}

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// Import models
const modelFiles = fs.readdirSync(__dirname).filter(file =>
  file !== "index.js" && file.endsWith(".js")
);

for (const file of modelFiles) {
  const { default: modelDefiner } = await import(path.join(__dirname, file));
  const model = modelDefiner(sequelize, DataTypes);
  db[model.name] = model;
}

// Associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
