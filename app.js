'use strict'

//  read Libarys
const sequelize = require('sequelize')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression');
const app = express()

// Activate express body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// activating gzip compression
app.use(compression());

// Initialize Database
const db_connection_str = "mysql://test:test@localhost:3306/test"
const dbConnection = new sequelize(db_connection_str, {logging: false})

/**
 * Base querry
 */

app.get('/query/:query', async function (req, res) {
    const query =  decodeURIComponent(req.params.query)
    const returnValue = await dbConnection.query(query,  { type: dbConnection.QueryTypes.SELECT})
    res.status("200")
    res.send(returnValue)
})

/**
 * start express listener
 */
app.listen(3000, function () {
  console.log('App listening on port ' + 3000 + ' !')
})
