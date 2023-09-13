const express = require("express");
const router = express.Router();
const {getgoals,setgoals, updategoals, deletegoals} =require('../controller/getgoals')

// router.get("/", getgoals );
// router.post("/",setgoals );

router.route('/').get(getgoals).post(setgoals)

// router.put("/:id", updategoals);
// router.delete("/:id", deletegoals );

router.route('/:id').put(updategoals).delete(deletegoals)


module.exports = router;
