import { hash } from 'bcryptjs'
import { v4 as uuidV4 } from 'uuid'
import createConnection from '../index'

async function create() {
  const connection = await createConnection("localhost")
  const id = uuidV4()
  const password = await hash("admin", 8)

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
     values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXXXX')
    `
  )
  await connection.close()
}

create().then(() => console.log('criou o seed'))
