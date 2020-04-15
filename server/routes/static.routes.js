import path from 'path'
import express from "express"

const CURRENT_WORKING_DIR = process.cwd()

const router = express.Router()

router.route('/dist')
  .get(express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

export default router