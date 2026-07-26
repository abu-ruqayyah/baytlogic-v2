/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bqwvwtqk'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Subdomain on sanity.studio (e.g. baytlogic-technologies.sanity.studio)
const studioHost = 'baytlogic-technologies'

export default defineCliConfig({ 
  api: { projectId, dataset },
  studioHost,
  deployment: {
    appId: 'xnee3ubcshfa4s7ril1139uf',
  }
})
