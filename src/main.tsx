import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BayesianPage from './pages/BayesianPage/BayesianPage.tsx'
import Layout from './NavigationBar/layout.tsx' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <BayesianPage />
    </Layout>
  </StrictMode>,
)