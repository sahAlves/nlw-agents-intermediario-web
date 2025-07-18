import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'

// Este trecho inicializa a aplicação React.
// Ele obtém o elemento HTML com id 'root' e renderiza o componente <App /> dentro dele,
// utilizando <StrictMode> para ajudar a identificar possíveis problemas no código durante o desenvolvimento.
// biome-ignore lint/style/noNonNullAssertion: Mandatory by react
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
