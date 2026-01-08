import { useState } from 'react'
import LandingPage from './components/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <LandingPage/>
    </div>
  )
}

export default App
