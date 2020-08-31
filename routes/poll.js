const express = require("express");
const router = express.Router();
const con=require('../controller/poll')



router.post("/",con.form);

router.route('/poll/:title')
  .get(con.pollget)
  .post(con.pollpost)
// router.post("/poll", (req, res) => {
//   const newVote = {
//     os: req.body.os,
//     points: 1,
//   };

//   new Vote(newVote).save().then((vote) => {
//     pusher.trigger("os-poll", "os-vote", {
//       points: parseInt(vote.points),
//       os: vote.os,
//     });

//     return res.json({ success: true, message: "Thank you for voting" });
//   });
// });

module.exports = router;
