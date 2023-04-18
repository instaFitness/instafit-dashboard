import React from "react"
import { Route, Routes } from "react-router-dom"
import TrainingPlan from "./TrainingPlan"
import TargetBody from "./TargetBody"

const Trainings = () => {
  return (
    <Routes>
      <Route path='/plan' element={<TrainingPlan />} />
      <Route path='/target-body' element={<TargetBody />} />
    </Routes>
  )
}

export default Trainings
