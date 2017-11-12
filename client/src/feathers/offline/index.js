import Dexie from 'dexie'

const db = new Dexie('PendingActionsDatabase')
db.version(1).stores({ pendingActions: '++id,type,payload,jwt' })

export default db
