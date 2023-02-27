import path from 'path'
import fs from 'fs'

import Pool from './pg_pool'
import Helper from './helper'
import AutoSchema from './auto_schema'

class Schema {
  public static async handle(main: Function, pool: Pool, config: any): Promise<void> {
    let dbName = ''
    let scriptsPath = ''
    const migrationsPath =
      process.env.NODE_ENV === 'production' ? '../migrations' : '../migrations'
    const seedersPath = process.env.NODE_ENV === 'production' ? '../seeders' : '../seeders'

    try {
      const client = await pool.connect()
      dbName = (client as unknown as { database: string }).database
      client.release()
    } catch (err) {
      err.text = err.toString()
      console.error(err)
    }

    scriptsPath = path.join(__dirname, migrationsPath)

    try {
      await AutoSchema.insertScripts(pool, dbName, scriptsPath)
      const res = await AutoSchema.updateSchema(pool, dbName)
      await AutoSchema.updateSnapshots(pool, dbName)
      console.log('\x1b[32m%s\x1b[0m', res)
    } catch (err) {
      console.log('error:', err)
      if (err.code === 'ENOTFOUND') {
        console.log(
          `\n\nWARNING: Database ${config.forensic_db_conf.database} not found on host ${config.forensic_db_conf.host}, check configuration file.\n`,
        )
      } else if (err === 'error: relation "database_updates" does not exist') {
        const seederScriptPath = path.join(__dirname, seedersPath)
        const scriptName = 'init.sql'
        const scriptSQL = fs.readFileSync(seederScriptPath + '/' + scriptName, 'utf8')
        const params: Array<any> | undefined = []

        try {
          await pool.aquery(Helper.defaultUser(), scriptSQL, params)
          main()
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log('err', err)
        console.log(`\n\n!!!  Website API Server cannot start  !!!\n`)
      }
      throw err
    }
  }
}

export default Schema
