import './App.css'
import ProfileCard from './components/ProfileCard.jsx'
import Counter from './components/Counter'
import TipCalc from './TipCalc'
import TodoList from './components/TodoList'
import RegisterForm from './components/RegisterForm'

function App() {
  console.log("App")

  return (
    <div className="flex flex-col">
      <div className="p-8 grid grid-cols-3 gap-4">
        <ProfileCard name="Aom" role="Developer" />
        <Counter />
        <TipCalc />
        <TodoList />
        <RegisterForm />
      </div>
    </div>
  )
}

export default App
