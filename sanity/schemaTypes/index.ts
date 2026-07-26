import { type SchemaTypeDefinition } from 'sanity'
import { certificate } from './certificate'
import { project } from './project'
import { product } from './product'
import { staff } from './staff'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [certificate, project, product, staff],
}
