import React from "react"
import { Route, Routes } from "react-router-dom"
import FitnessPlan from "./FitnessPlan"
import TargetBody from "./TargetBody"

const Fitness = () => {
  return (
    <Routes>
      <Route path='/plan' element={<FitnessPlan />} />
      <Route path='/target-body' element={<TargetBody />} />
    </Routes>
  )
}

export default Fitness