import { query as q } from 'faunadb'
import { faunaClient } from '../../../../lib/faunadb'

export default async (req, res) => {
  const {
    query: { id }
  } = req

  const { term, meaning, description, url } = req.body

  try {
    await faunaClient.query(
      q.Update(q.Ref(q.Collection('terms'), id), {
        data: {
          term,
          meaning,
          description,
          url
        }
      })
    )
    res.status(200).end()
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}