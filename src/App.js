import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './views/home';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Routes>
      <Route exact path='/' element={< Home />}></Route>
    </Routes>
  );
}

export default App;
