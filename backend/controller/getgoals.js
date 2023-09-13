const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')



const getgoals = asyncHandler(async (req, res) => {
  const goal = await Goal.find()
  res.status(200).json(goal);
});

const setgoals = asyncHandler(async (req, res) => {
  if (!req.body.text){
    res.status(400)
    throw new Error('please add a text field')
  }   
  const goal = await  Goal.create({
    text:req.body.text
  })
  res.status(200).json(goal);
});

const updategoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if(!goal ){
    res.status(400)
    throw new Error('Goal not found')
  }
  const updatedgoal = await  Goal.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
  })
  res.status(200).json(updatedgoal);
});

const deletegoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
  if(!goal ){
    res.status(400)
    throw new Error('Goal not found')
  }
  await goal.deleteOne()
  res.status(400).json({ id: req.params.id });
});
module.exports = {
  getgoals,
  setgoals,
  updategoals,
  deletegoals,
};
