import * as express from 'express'
import * as config from 'config'

const app = express()
const port = config.get('expressPort')

app.use('/', express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
