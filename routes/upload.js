const { S3Client } = require('@aws-sdk/client-s3');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const crypto = require("crypto");

const s3 = new S3Client({region: 'ap-southeast-1'});
const router = express.Router();
const bucketName = 'azid-dcv-test-transcribe';

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        metadata: function (req, file, cb) {
            cb(null, { 
                fieldName: file.fieldname,
                email: `${req.headers.email}`
            });
        },
        key: function (req, file, cb) {
            const fn = `${req.headers.filename}.ogg`;
            const hash = crypto.createHash('sha256');
            const data = hash.update(`${req.headers.email}`, 'utf-8');
            cb(null, `input/${data.digest('hex').substring(0,16)}-${fn}`)
        }
    })
});

router.post('/', upload.single('audio'), function (req, res, next) {
    res.json({ message: `Transcript will be set to ${req.headers.email}` });
});

module.exports = router;
