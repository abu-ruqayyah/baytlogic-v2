import { defineType, defineField } from 'sanity'

export const certificate = defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    defineField({
      name: 'certificateId',
      title: 'Certificate ID',
      type: 'string',
      description: 'e.g. BLT-2026-027',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'studentName',
      title: 'Student / Recipient Name',
      type: 'string',
      description: 'e.g. Bayt Logic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'courseName',
      title: 'Course / Masterclass Title',
      type: 'string',
      description: 'e.g. SMART HOME AUTOMATION & CCTV MASTER CLASS',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'durationText',
      title: 'Duration Text',
      type: 'string',
      description: 'e.g. 5-Day Professional Masterclass on',
      initialValue: '5-Day Professional Masterclass on',
    }),
    defineField({
      name: 'issueDate',
      title: 'Issue Date',
      type: 'string',
      description: 'e.g. 2026-09-05 or April 2, 2026',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sponsoringPartner',
      title: 'Sponsoring Partner / Collaboration',
      type: 'string',
      description: 'e.g. HAMJIK CARE INITIATIVE or NURTUREROOTS FOUNDATION',
    }),
    defineField({
      name: 'showSponsor',
      title: 'Show Sponsoring Partner Banner',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'directorName',
      title: 'CEO / Founder Name',
      type: 'string',
      initialValue: 'Engr. Yahaya Sulaiman Abdullahi',
    }),
    defineField({
      name: 'directorTitle',
      title: 'CEO / Founder Title',
      type: 'string',
      initialValue: 'CEO / Founder & Director',
    }),
    defineField({
      name: 'facilitatorName',
      title: 'Lead Facilitator Name',
      type: 'string',
      initialValue: 'Engr. Ahmad Adamu Zakari',
    }),
    defineField({
      name: 'facilitatorTitle',
      title: 'Lead Facilitator Title',
      type: 'string',
      initialValue: 'Lead Training Facilitator',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Valid', value: 'Valid' },
          { title: 'Revoked', value: 'Revoked' },
          { title: 'Suspended', value: 'Suspended' },
        ],
      },
      initialValue: 'Valid',
    }),
  ],
})
