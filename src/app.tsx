import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateRoom } from './pages/create-room';
import { Room } from './pages/room';

// 1. Envolve toda a aplicação com o QueryClientProvider, que fornece o contexto do React Query
// para gerenciamento de cache e requisições assíncronas. O objeto 'queryClient' deve ser criado anteriormente.
// 2. Usa o BrowserRouter para habilitar o roteamento baseado em URL, permitindo navegação entre páginas.
// 3. Define as rotas da aplicação usando o componente Routes:
// - A rota principal (index) renderiza o componente CreateRoom.
// - A rota "/room/:roomId" renderiza o componente Room, onde ":roomId" é um parâmetro dinâmico da URL.
// Assim, a estrutura garante que o React Query e o roteamento estejam disponíveis para todos os componentes filhos.
const queryClient = new QueryClient();
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<CreateRoom />} index />
          <Route element={<Room />} path="/room/:roomId" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
