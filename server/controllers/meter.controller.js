var express = require('express');
var router = express.Router();
var meterService = require('services/meter.service');

//routes

router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.put('/:_id',update);
router.delete('/:_id', _delete);

module.exports = router;


function register(req, res) {
    meterService.create(req.body)
    .then(function () {
         res.json('success');
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

function getAll(req, res) {
    meterService.getAll()
    .then(function (members) {
        res.send(members);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

function getCurrent(req,res) {
    meterService.getById(req.member.sub)
    .then(function (member) {
        if (member) {
            res.send(member);
        }else{
            res.sendStatus(400);
        }
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

function update(req, res) {
    meterService.update(req.params._id, req.body)
    .then(function () {
         res.json('success');
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

function _delete(req, res) {
    meterService.delete(req.params._id)
    .then(function () {
         res.json('success');
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}