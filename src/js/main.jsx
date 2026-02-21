import React from 'react'
import ReactDOM from 'react-dom/client'

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"

// index.css'
import '../styles/index.css'

// components
import Home from './components/Home';
import LogIn from './components/LogIn';
import StaffRegistry from './components/Forms/StaffRegistry';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='bg-black'>
    <StaffRegistry/>
    {/* <LogIn/> */}

    </div>
    
  </React.StrictMode>,
)
