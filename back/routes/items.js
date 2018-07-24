const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/', (req, res) => {
  // res.json[]
  db.query(`SELECT * FROM items`, (err, items) => {
    if (err) {
      console.log(err)
      return res.status(500).json({error: 'u fail fag'})
    }
    res.json(items)
  })
})

router.post('/', (req, res) => {
  const {name, picture} = req.body
  const requete1 = 'INSERT INTO items (name, picture) VALUES (?,?)'
  const requete2 = 'SELECT * FROM items'
  db.query(requete1, [name, picture], (err, result) => {
    if (err) {
      console.erreur(err)
      return res.status(500).json({
        error: 'fail'
      })
    }
    db.query(requete2, (err, newItems) => {
      if(err) {
        console.erreur(err)
        return res.status(500).json({error: 'fail'})
      }
      res.json(newItems)
    })
  })
})

module.exports = router