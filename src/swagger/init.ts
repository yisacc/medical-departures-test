import swaggerJsdoc from 'swagger-jsdoc'
import swaggerParser from '@apidevtools/swagger-parser'
import fs from 'fs'
import path from 'path'
import options from '.'
import { OpenAPI } from 'openapi-types'
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const YAML = require('json-to-pretty-yaml')
export default async function main(): Promise<number> {
  try {
    const oas3Specification: any = swaggerJsdoc(options)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const api = await swaggerParser.validate(oas3Specification) as OpenAPI.Document
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const yaml_api:string = YAML.stringify(api)
    const apiFile = path.resolve(__dirname, 'backend_api.yaml')
    fs.writeFileSync(apiFile, yaml_api)
    console.log('\x1b[32m%s\x1b[0m', `Valid OpenAPI spec in file ${apiFile}: Valid`)
    return 0
  } catch (err) {
    console.log('There is a problem with the OpenAPI spec in the code ', err.message)
    return 1
  }
}
