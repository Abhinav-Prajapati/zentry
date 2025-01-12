import { About } from './components/About'
import { Features } from './components/Features'
import Hero from './components/Hero'

function App() {
  return (
    <main className='relative min-h-screen w-screen'>
      <Hero />
      <About />
      <Features />
    </main>
  )
}

export default App
