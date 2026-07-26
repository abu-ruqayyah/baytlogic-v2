import { defineType, defineField } from 'sanity'

export const staff = defineType({
  name: 'staff',
  title: 'Staff Users',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'The real name of the staff member (e.g. Yahaya Sulaiman Abdullahi)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      description: 'Used by the staff member to log in',
      validation: (Rule) => Rule.required().lowercase(),
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
      description: 'Staff password',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
