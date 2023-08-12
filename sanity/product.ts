import { defineType, defineField } from 'sanity';

const Product = defineType({
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
        }),
        defineField({
            name: 'price',
            type: 'string',
            title: 'Price',
        }),
        defineField({
            name: 'currency',
            type: 'string',
            title: 'Currency',
        }),
        defineField({
            name: 'percentageDiscount',
            type: 'string',
            title: 'Percentage Discount',
        }),
        defineField({
            name: 'aboutBrand',
            title: 'About Brand',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'specifications',
            title: 'Specifications',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'productDetail',
            title: 'Product Detail',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        {
                            type: 'productCategory',
                        },
                    ],
                    options: {
                        disableNew: true,
                    },
                },
            ],
        }),
        defineField({
            name: 'size',
            type: 'array',
            title: 'Size',
            of: [
                {
                    type: 'string',
                    options: {
                        maxLength: 10,
                    },
                },
            ],
        }),
        defineField({
            name: 'color',
            type: 'array',
            title: 'Color',
            of: [
                {
                    type: 'string',
                    options: {
                        maxLength: 10,
                    },
                },
            ],
        }),
        defineField({
            name: 'stock',
            type: 'number',
            title: 'Stock',
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
        }),
    ],
});

export default Product;

