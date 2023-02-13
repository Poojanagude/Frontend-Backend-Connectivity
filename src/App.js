
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Component/Header';
import Home from './Component/Home';
import Register from './Component/Register';
import {Route,Routes}from 'react-router-dom'


function App() {
  return (
   <>
   <Header/>
   <Routes>
  <Route path='/' element={<Home/>}></Route> 
  <Route path='/register' element={<Register/>}></Route> 
   </Routes>
   </>
  );
}

export default App;
