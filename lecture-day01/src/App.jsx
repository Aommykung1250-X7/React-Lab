import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Profilecard from './components/Profilecard'
import Badge from './components/Badge'
import { users } from './costant/users';

function App() {
  const [count, setCount] = useState(0)
  const name = "Phanuwat Audkanthar";
  const age = 25;

  console.log("name >>>", name);

  return (
    <>
      <div className="flex flex-col gap-2">
        {users.map(user => (
          <Profilecard key={user.id} name={user.name} role={user.role} department={user.department} isOnline={user.isOnline} />
        ))}
      </div>
    </>
  )
}

export default App
