import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BayesianPage from './BayesianPage.tsx'
import Layout from './Components/Layout.tsx' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <BayesianPage />
    </Layout>
  </StrictMode>,
)