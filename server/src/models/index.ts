// server/src/models/index.ts
import Product from './Product';
import ProductVariant from './ProductVariant';
import Configuration from './Configuration';

// Un producto tiene muchas variantes
Product.hasMany(ProductVariant, {
  foreignKey: 'productId',
  as: 'variants',
});

// Cada variante pertenece a un producto
ProductVariant.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});

export {
  Product,
  ProductVariant,
  Configuration,
};
