import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  BrowserRouter, createBrowserRouter, Outlet, Route, Router, RouterProvider, Routes } from 'react-router-dom'
import Login from "./components/Login.jsx"
import Profile from "./components/Profile.jsx"
import { Provider } from 'react-redux'
import store from './redux/appStore.js'
import Feed from './components/Feed.jsx'
import Connections from './components/Connections.jsx'
import ConnectionReq from './components/ConnectionReq.jsx'
// const router = createBrowserRouter([
//   {
//     path : "/",
//     element : (<App />),
//     children : [
//       {
//         path : "home",
//         element : <><h1>Home</h1><Outlet /></>,
//         children : [
//           {
//             path : "new",
//             element : (<><h1>New Home</h1></>)
//           },
//           {
//             path : "old",
//             element : (<><h1>Old home</h1></>)
//           }
//         ]
//       }
//     ]
//   }
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<App/>} >
          <Route path='/' element={<Feed />} />
          <Route  path='login' element={<Login />} />
          <Route  path='profile' element={<Profile />} />
          <Route  path='connections' element={<Connections />} />
          <Route  path='connectionreq' element={<ConnectionReq />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
