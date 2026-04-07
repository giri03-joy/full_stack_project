import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { BookProvider } from './context/BookContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { CourseProvider } from './context/CourseContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <CourseProvider>
          <BookProvider>
            <App />
          </BookProvider>
        </CourseProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
)
