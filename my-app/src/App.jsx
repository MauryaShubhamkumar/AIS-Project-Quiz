import { useState } from 'react'
import Quiz from './component/Quiz'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
        <Quiz/>
     </div>
        
    </>
  )
}

export default App
