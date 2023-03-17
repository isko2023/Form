
import { useState , useEffect} from 'react';

import Login from './components/Login';
import Register from './components/register';

function App() {

  const [showItem , setShow] = useState(false)

  return (
    <>
    {showItem ? (
    <main className="App">
    <Login  setShow={setShow}/>
    </main> ) : (
    <main className="App"><Register setShow={setShow}/></main>
      
  )}
    </>
  );
}



export default App;


