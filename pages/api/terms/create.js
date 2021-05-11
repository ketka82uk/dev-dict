import { query as q } from 'faunadb'
import { faunaClient } from '../../../lib/faunadb'

export default async (req, res) => {
  const { term, meaning, description, url } = req.body

  try {
    await faunaClient.query(
      q.Create(q.Collection('terms'), {
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