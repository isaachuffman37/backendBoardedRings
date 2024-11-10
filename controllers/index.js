const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

async function getAllRings(req, res, next) {
  try{
    const result = await mongodb.getMongoDb().db('boardedRings').collection('rings').find();
  result.toArray().then((lists) => {
    if (!lists){
      throw createError(500, "Could not get rings")
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  } catch (err) {
    next(err);
  }
  
}

async function insertOneBuyer(req, res, next) {
  try {
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
          throw createError(500, "Buyer was not inserted for unknown reason")
        }
      });
  } catch(err) {
    next(err);
  }
  
}

async function changeOneBuyer(req, res, next) {
  try{
    const contactId = req.params.id;
  const filter = { _id: new ObjectId(contactId) };
  const updateDoc = {
    $set: {
      firstName: req.body.firstName
    }
  };
  await mongodb
    .getMongoDb()
    .db('boardedRings')
    .collection('buyers')
    .updateOne(filter, updateDoc)
    .then((response) => {
      if (response.acknowledged) {
        if (response.modifiedCount <= 0) {
          if (response.matchedCount > 0) {
            res
              .status(202)
              .json(
                'No error but document not modified due to same data in put request as the original data'
              );
          } else {
            throw createError(404, 'ID did not match any in current data')
          }
        } else {
          res.status(204).send();
        }
      } else {
        throw createError(500, 'Could not update due to unknown error')
      }
    });
  } catch(err){
    next(err)
  }
}

async function deleteOneRing(req, res, next) {
  const contactId = req.params.id;
  try {
    await mongodb
      .getMongoDb()
      .db('boardedRings')
      .collection('rings')
      .deleteOne({ _id: new ObjectId(contactId) })
      .then((deletedResponse) => {
        if (deletedResponse.acknowledged) {
          if (deletedResponse.deletedCount > 0) {
            res.status(200).send();
          } else {
            throw createError(404, 'ID did not match any in current data')
          }
        } else {
          res.status(500).json(res.error);
        }
      });
  } catch (err) {
    next(err);
  }
}

async function getOneUser(req, res, next) {
  const contactId = req.params.id;
  await mongodb
    .getMongoDb()
    .db('boardedRings')
    .collection('users')
    .findOne({ _id: new ObjectId(contactId) })
    .then((contact) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contact);
    });
}

module.exports = {
  getAllRings,
  insertOneBuyer,
  changeOneBuyer,
  deleteOneRing
};
