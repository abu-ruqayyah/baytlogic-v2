import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product Catalog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'SKU / Model Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Unit Price (NGN)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'CCTV Surveillance', value: 'cctv' },
          { title: 'NVR & Recording', value: 'nvr' },
          { title: 'Smart Home Automation', value: 'smarthome' },
          { title: 'Networking Equipment', value: 'networking' },
          { title: 'Solar & Power Backup', value: 'power' },
          { title: 'Other Accessories', value: 'other' }
        ]
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    })
  ]
})
