import { query as q } from 'faunadb'
import { faunaClient } from '../../../../lib/faunadb'

async function Delete(req, res) {
  const {
    query: { id }
  } = req

  try {
    await faunaClient.query(q.Delete(q.Ref(q.Collection('terms'), id)))
    res.status(200).end()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

export default Delete