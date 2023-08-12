import { type SchemaTypeDefinition } from 'sanity';
import Product from './product';
import ProductCategory from './productCategory';
export const schema: { types: SchemaTypeDefinition[] } = {
    types: [ProductCategory, Product],
};

