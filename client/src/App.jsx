import AddProblemForm from "./components/addProblemForm"
import CFDashboard from "./components/CFDashboard"
import GoalProgress from "./components/GoalProgress"


function App() {

  return (
    <div>
      <CFDashboard handle="Vasu.609"/>
      <AddProblemForm/>
      <GoalProgress/>
    </div>
  )
  
}

export default App
