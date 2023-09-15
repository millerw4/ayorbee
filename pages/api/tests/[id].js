import dbConnect from '../../../lib/dbConnect'
import ABTest from '../../../models/ABTest'

export default async function handler(req, res) {
  const { query: { id }, method } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const test = await ABTest.find({uid: id})
        if (!test) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: test })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      const q = {};
      q[req.body.field] = 1
      try {
        const test = await ABTest.findOneAndUpdate( {uid: id}, {$inc : q}, {
          new: true,
          runValidators: true,
        })
        if (!test) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: test })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedTest = await ABTest.deleteOne({ _id: id })
        if (!deletedTest) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
