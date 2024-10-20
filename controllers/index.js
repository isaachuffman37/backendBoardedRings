const { response } = require('express');
const mongodb = require('../db/connect');
var ObjectId = require('mongodb').ObjectId;

async function getAllRings(req, res, next) {
    const result = await mongodb.getMongoDb().db('boardedRings').collection('rings').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
}


async function insertOneBuyer(req, res, next) {
    const newBuyer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber
    };
    await mongodb
      .getMongoDb()
      .db('boardedRings')
      .collection('buyers')
      .insertOne(newBuyer)
      .then((response) => {
        if (response.acknowledged) {
          res.status(201).json(response.insertedId);
        } else {
          res.status(500).json(response.error);
        }
      });
}


async function deleteOneBuyer(req, res, next){
  return
}

async function changeOneBuyer(req, res, next){
  return
}




module.exports = {
    getAllRings,
    insertOneBuyer,
    deleteOneBuyer,
    changeOneBuyer
}