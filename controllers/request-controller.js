const { REQUEST_TYPE } = require('../translator/request-options')
const Request = require('../models/request-model')
const ObjectId = require('mongoose').Types.ObjectId;

const createRequest = async (req, res) => {
    const rqid = new ObjectId();
    const { expire } = req.body
    const data = req.body.data
    const existrq = await Request.findOne({ user_id: data.user_id, related_id: data.related_id }, (err, rq) => {
        if (err) {
            return res.status(400).json({ success: false, errorMessage: "Failed to get request" })
        }
    }).catch(err => console.log(err));
    if (existrq) {
        existrq.createdAt = Date.now()
        existrq.save()
        return res.status(201).json({
            message: "Success",
            request: existrq
        })
    } else {
        data._id = rqid
        data.createdAt = Date.now()
        data.createdAt.expireAfterSeconds = expire
        const rq = new Request(data)
        rq.save()
        return res.status(201).json({
            message: "Success",
            request: rq
        })
    }
}

const deleteRequest = async (req, res) => {
    const data = req.body.data
    const delrq = await Request.findOneAndDelete({ user_id: data.user_id, related_id: data.related_id }).catch(err => console.log(err));
    return res.status(200).json({
        success: true,
        request: delrq,
        message: "Request Deleted"
    })
}

const getRequest = async (req, res) => {
    const data = req.body.data
    const findrq = await Request.findOne({ user_id: data.user_id, related_id: data.related_id }, (err, rq) => {
        if (err) {
            return res.status(400).json({ success: false, errorMessage: "Failed to get request" })
        }
    }).catch(err => console.log(err));
    return res.status(200).json({
        success: true,
        request: findrq // if request doesn't exist, it would return null 
    })
}

const getRequestById = async (req, res) => {
    const data = req.body.data
    const findrq = await Request.findOne({ _id: data._id }, (err, rq) => {
        if (err) {
            return res.status(400).json({ success: false, errorMessage: "Failed to get request" })
        }
    }).catch(err => console.log(err));
    return res.status(200).json({
        success: true,
        request: findrq // if request doesn't exist, it would return null 
    })
}

module.exports = {
    createRequest,
    deleteRequest,
    getRequest,
    getRequestById
}