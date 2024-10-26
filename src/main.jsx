
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './TaskReducer.jsx';

const store=configureStore({
  reducer:{
   tasks: taskReducer,
  },
})
  

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
     <App />
    </Provider>
  
)
