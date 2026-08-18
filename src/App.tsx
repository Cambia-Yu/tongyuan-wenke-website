import { lazy, Suspense } from 'react'
import { Navigate, Routes, Route } from 'react-router'
import Home from './pages/Home'
import WebsiteDirection from './pages/WebsiteDirection'
import Scenarios from './pages/Scenarios'
import Practices from './pages/Practices'
import PracticeArticle from './pages/PracticeArticle'
import ResearchKnowledgeProject from './pages/ResearchKnowledgeProject'
import Method from './pages/Method'
import About from './pages/About'
import Start from './pages/Start'
import Insights from './pages/Insights'
import InsightArticle from './pages/InsightArticle'
import NotFound from './pages/NotFound'
import ScrollManager from '@/components/site/ScrollManager'
import { ToastHost } from '@/components/ui-kimi/Toast'

const DesignLab = lazy(() => import('./pages/DesignLab/DesignLab'))

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<WebsiteDirection />} />
        <Route path="/legacy" element={<Home />} />
        <Route path="/services" element={<Scenarios />} />
        <Route path="/projects" element={<Practices />} />
        <Route path="/projects/settlement-coordination" element={<PracticeArticle />} />
        <Route path="/projects/supply-chain-research-kb-poc" element={<ResearchKnowledgeProject />} />
        <Route path="/approach" element={<Method />} />
        <Route path="/methodology" element={<Navigate to="/approach" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Start />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:id" element={<InsightArticle />} />
        <Route path="/design-lab" element={<Suspense fallback={null}><DesignLab /></Suspense>} />
        <Route path="/scenarios" element={<Navigate to="/services" replace />} />
        <Route path="/practices" element={<Navigate to="/projects" replace />} />
        <Route path="/practices/settlement-coordination" element={<Navigate to="/projects/settlement-coordination" replace />} />
        <Route path="/method" element={<Navigate to="/approach" replace />} />
        <Route path="/start" element={<Navigate to="/contact" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastHost />
    </>
  )
}
