import db from '@/feathers/offline'

console.log('About to listen to "sync" event: ')

self.addEventListener('sync', function (event) {
  console.log('Listening to "sync" event2: ')
  console.log(event)
  const pendingOperations = db.pendingActions.toArray()
  console.log('The pending operations are2: ')
  console.log(pendingOperations)
})
