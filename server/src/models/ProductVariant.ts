// server/src/models/ProductVariant.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ProductVariantAttributes {
  id: number;
  productId: number; // propiedad añadida para la relación con Product
  diseño: string;
  variante?: string | null;
  stock: number;
  qrCode?: string | null;
  idAlegra?: string | null;
  unitCost?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductVariantCreationAttributes
  extends Optional<
    ProductVariantAttributes,
    'id' | 'variante' | 'qrCode' | 'idAlegra' | 'unitCost' | 'createdAt' | 'updatedAt'
  > {}

class ProductVariant
  extends Model<ProductVariantAttributes, ProductVariantCreationAttributes>
  implements ProductVariantAttributes {
  public id!: number;
  public productId!: number; // propiedad incluida en el modelo
  public diseño!: string;
  public variante!: string | null;
  public stock!: number;
  public qrCode!: string | null;
  public idAlegra!: string | null;
  public unitCost!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductVariant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false, // es obligatorio para la relación
    },
    diseño: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    variante: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    qrCode: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    idAlegra: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unitCost: {
      type: DataTypes.INTEGER, // puedes cambiar a DECIMAL si lo necesitas
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'ProductVariants',
    timestamps: true,
  }
);

export default ProductVariant;
