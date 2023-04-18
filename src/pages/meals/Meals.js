import React from "react"
import { Route, Routes } from "react-router-dom"
import MealPlan from "./MealPlan"
import MealType from "./MealType"

const Meals = () => {
  return (
    <Routes>
      <Route path='/plan' element={<MealPlan />} />
      <Route path='/type' element={<MealType />} />
    </Routes>
  )
}

export default Meals
