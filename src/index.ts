import * as express from 'express'
import * as config from 'config'
import * as bodyParser from 'body-parser'
import * as fs from 'fs'

import dbRoutes from './db/db-routes'
import staticRoutes from './static-routes'

const app = express()
const port = config.get('expressPort')

app.use(bodyParser.json())

app.use('/', express.static('public'))
app.use('/api', config.get('useDb') ? dbRoutes : staticRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
