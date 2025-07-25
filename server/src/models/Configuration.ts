// server/src/models/Configuration.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ConfigurationAttributes {
  key: string;
  value: string;
}

// Si deseas que 'key' sea obligatorio, no uses Optional en este caso
// Pero en caso de que se generen registros sin clave, podrías modificarlo
interface ConfigurationCreationAttributes extends Optional<ConfigurationAttributes, 'key'> {}

class Configuration extends Model<ConfigurationAttributes, ConfigurationCreationAttributes> 
  implements ConfigurationAttributes {
  public key!: string;
  public value!: string;
}

Configuration.init(
  {
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Configurations',
    timestamps: false,
  }
);

export default Configuration;
