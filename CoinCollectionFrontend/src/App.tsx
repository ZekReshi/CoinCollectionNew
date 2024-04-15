import '@mantine/core/styles.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Details from './pages/Details'
import Statistics from './pages/Statistics'
import NotFound from './pages/NotFound'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="details/:id" element={<Details />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="statistics/:id" element={<Statistics />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
