// server/src/models/Product.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ProductAttributes {
  id: number;
  nombre: string;
  codigo?: string | null;
  tipo: string;
  descripcion?: string | null;
  equipo?: string | null;
  idAlegra?: string | null; // propiedad añadida
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes
  extends Optional<
    ProductAttributes,
    'id' | 'codigo' | 'descripcion' | 'equipo' | 'idAlegra' | 'createdAt' | 'updatedAt'
  > {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  public id!: number;
  public nombre!: string;
  public codigo!: string | null;
  public tipo!: string;
  public descripcion!: string | null;
  public equipo!: string | null;
  public idAlegra!: string | null; // propiedad incluida en el modelo

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    equipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idAlegra: {
      type: DataTypes.STRING,
      allowNull: true, // se puede dejar como opcional
    },
  },
  {
    sequelize,
    tableName: 'Products',
    timestamps: true,
  }
);

export default Product;
