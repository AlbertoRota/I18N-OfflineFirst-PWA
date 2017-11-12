import feathers from 'feathers/client'
import hooks from 'feathers-hooks'
import socketio from 'feathers-socketio/client'
import auth from 'feathers-authentication-client'
import io from 'socket.io-client'

import { store } from '@/store'

const socket = io('http://192.168.2.239:3030', {transports: ['websocket']})

socket.on('connect', function () { store.dispatch('offline/setIsOffline', false) })
socket.on('disconnect', function () { store.dispatch('offline/setIsOffline', true) })

const feathersClient = feathers()
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))

export default feathersClient
