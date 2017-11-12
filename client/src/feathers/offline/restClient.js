import feathers from 'feathers/client'
import hooks from 'feathers-hooks'
import rest from 'feathers-rest/client'
import auth from 'feathers-authentication-client'

const feathersRestClient = feathers()
  .configure(hooks())
  .configure(rest('http://localhost:3030').fetch(fetch))
  .configure(auth({ storage: window.localStorage }))

export default feathersRestClient
