import { query as q } from 'faunadb'
import { faunaClient } from '../../../lib/faunadb'

export default async (req, res) => {
  try {
    const terms = await faunaClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_terms_sorted_alphabetically'))),
        q.Lambda(['name', 'termRef'], q.Get(q.Var('termRef')))
      ))
    res.status(200).json(terms.data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}