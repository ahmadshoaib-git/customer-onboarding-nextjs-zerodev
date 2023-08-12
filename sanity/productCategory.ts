import { defineType, defineField } from 'sanity';
const ProductCategory = defineType({
    name: 'productCategory',
    title: 'Product Categories',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Category Name',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Category Image',
            type: 'image',
            options: {
                hotspot: true, // <-- Defaults to false
            },
        }),
    ],
});

export default ProductCategory;

