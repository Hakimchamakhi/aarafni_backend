const express = require('express');
const router = express.Router();

// Project Model
const Project = require('../models/Project');
// Comment Model
const Comment = require('../models/Comment');
// User Model
const User = require('../models/User');


router.post('/add', (req, res) => {
    const { title, client, description } = req.body
    const newProject = new Project({
        title,
        client,
        description
    })
    try {
        newProject.save()
            .then(
                res.json("Project Added Successfully")
            )
    } catch (error) {
        res.json(error)
    }
})


router.get('/all', (req, res) => {
    Project.find()
        .then(projects => {
            try {
                res.json(projects)
            } catch (error) {
                res.json(error)
            }
        })
})
// Get Projects by client ID
router.get('/project', (req, res) => {
    const email = req.query.email
    User.findOne({ email })
        .then(user => {
            Project.find({ client: user?._id })
                .then(projects => {
                    try {
                        res.json(projects)
                    } catch (error) {
                        res.json(error)
                    }
                })
        })

})
// Add New Task
router.post('/newtask', (req, res) => {
    const { newtask, project_id } = req.body
    Project.findOne({ _id: project_id }, function (err, p) {
        p.notdone.push(newtask);
        p.save(function (err, p) {
            if (err) throw err;
            res.json("Task Added Successfully");
        });
    })
})
// Update tasks
router.put('/updatetasks', (req, res) => {
    const { notdone, inprogress, done, project_id } = req.body
    Project.findOneAndUpdate({ _id: project_id }, { notdone, inprogress, done })
        .then(res.json("Tasks Saved Successfully"));
})
// Send Comment
router.post('/comment', (req, res) => {
    const { project_id, username, comment, team_member } = req.body
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    let msg_date = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds

    Comment.findOne({ project_id }, function (err, comm) {
        if (comm) {
            comm.comments.push({ username, comment, team_member, "date": msg_date });
            comm.save(function (err, comm) {
                if (err) throw err;
                res.json("Comment Sent Successfully");
            });
        }
        else {
            const newComment = new Comment({
                project_id,
                comments: [{ username, comment, team_member, "date": msg_date }]
            })
            newComment.save()
            res.json("Comment Sent Successfully");
        }
    })
})
//get Comments
router.get('/allcomments', (req, res) => {
    const project_id = req.query.project_id
    Comment.findOne({ project_id })
    .then(comm => {
        try {
            res.json(comm.comments)
        } catch (error) {
            res.json(error)
        }
    })

})
module.exports = router;