import { query as q } from 'faunadb'
import { faunaClient } from '../../../../lib/faunadb'

export default async (req, res) => {
  const {
    query: { id }
  } = req

  try {
    const term = await faunaClient.query(
      q.Get(q.Ref(q.Collection('terms'), id))
    )
    res.status(200).json(term.data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}