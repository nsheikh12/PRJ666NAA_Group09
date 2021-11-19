const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticketModel');



/*MULTER SETUP*/
const FILESDIRECTORY = "./files";
const multer = require('multer')
var path = require("path");
var _ = require("underscore");

// multer storage
const STORAGE = multer.diskStorage({
    destination: FILESDIRECTORY,
    filename: function (req, file, cb) {
        //cb(null, Date.now() + path.extname(file.originalname));
        cb(null, file.originalname);
    }
});

// file type limitations
var fileFilter = function (req, file, cb) {
    // supported image file mimetypes
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif', 'image/txt', 'image/docx'];

    if (_.includes(allowedMimes, file.mimetype)) {
        // allow supported image files
        cb(null, true);
    } else {
        // throw error for invalid files
        cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'));
    }
};

// setting multer storage location and limits
const upload = multer({ storage: STORAGE, fileFilter: fileFilter, limits: { fileSize: 1024 * 1024 } }).single('file');

/* NODE MAILER SETUP */
var nodemailer = require("nodemailer");
//var {google} = require("googleapis")
require('dotenv').config({ path: './config/keys.env' })

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        //type: 'OAuth2',
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        // clientId: CLIENT_ID,
        // clientSecret: CLIENT_SECRET,
        // refreshToken: REFRESH_TOKEN,
        // accessToken: accessToken
    }
});

// Get all
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find()
        res.json(tickets)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Create one
router.post('/', (req, res) => {

    upload(req, res, err => {
        if (err instanceof multer.MulterError) {
            res.status(500).json({ message: { msgBody: "File is too large. Can only attach 1MB file.", msgError: true } });
            console.log("File is too large, error was caught.");
        }
        else if (err) {
            res.status(500).json({ message: { msgBody: "Unsupported file type, please try again.", msgError: true } });
            console.log("Unsupported file type.")
        }
        else {
             console.log(req.body)
            const ticket = new Ticket({
                studentID: req.body.studentID,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                deviceID: req.body.deviceID,
                // deviceType: req.body.deviceType,
                specialCase: req.body.specialCase,
                subject: req.body.subject,
                description: req.body.description,
                internalComment: req.body.internalComment, 
                file: req.file.filename
            })
            console.log(ticket)

            ticket.save(err => {
                if (err) {
                    res.status(400).json({ message: { msgBody: "There is something wrong with your information, please re-enter and try again. ", msgError: true } })
                } else {

                    let message = '<p>Hello, ' + req.body.firstName + "! </p><br><p>Your ticket was successfully submitted, here is the ticket information: </p><br>" +
                        '<table border="1" class = "text">' +
                        '<thead>' +
                        '<tr>' +
                        '<td>Email address</td>' +
                        '<td>subject</td>' +
                        '<td>problem description</td>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '<tr>' +
                        '<td>' + req.body.email + '</td>' +
                        '<td>' + req.body.subject + '</td>' +
                        '<td>' + req.body.description + '</td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>'

                    var mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: req.body.email,
                        subject: 'ServiceTicket - Your issue ticket has been successfully submitted.',
                        html: message
                    }
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log("ERROR: " + error);
                            res.status(500).json({ message: { msgBody: "There is something wrong with your information, please re-enter and try again. ", msgError: true } });
                        }
                        else {
                            console.log("SUCCESS: " + info.response);
                            res.status(201).json({ message: { msgBody: "The ticket is created successfully! You will be redirected to the dashboard in a second!", msgError: false } });
                        }
                    });


                }
            })



        }

    })
})



module.exports = router