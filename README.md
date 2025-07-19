# 🚀 Let me Ask - Web/Frontend

Este repositório representa o frontend do projeto desenvolvido durante a Trilha Intermediária do **NLW Agents** da Rocketseat.
A proposta foi reconstruir o clássico **Let me Ask**, uma aplicação pensada para lives e transmissões, onde o público pode enviar perguntas e o apresentador pode gerenciar todas elas em tempo real.
Mas aqui, o projeto ganhou um superpoder: a integração com um Agente de I.A., capaz de responder automaticamente as perguntas recebidas, tornando a interação com a audiência muito mais dinâmica.
Além disso, é possível criar novas salas personalizadas, permitindo que diferentes eventos, temas ou transmissões tenham seus próprios espaços para perguntas e respostas.

---

## 🛠️ Tecnologias Utilizadas

- **[React](https://react.dev/)** & **[TypeScript](https://www.typescriptlang.org/)** — SPA moderna e tipada
- **[Vite](https://vitejs.dev/)** — Build e dev server ultrarrápido
- **[Tailwind CSS](https://tailwindcss.com/)** — Estilização utilitária
- **[@tanstack/react-query](https://tanstack.com/query/latest)** — Gerenciamento e cache de dados
- **[React Router DOM](https://reactrouter.com/en/main)** — Roteamento SPA
- **[class-variance-authority](https://cva.style/)**, **[clsx](https://github.com/lukeed/clsx)**, **[tailwind-merge](https://tailwind-merge.vercel.app/)** — Utilitários de classe
- **[Radix UI](https://www.radix-ui.com/)** — Componentes acessíveis (Slot)
- **[Lucide React](https://lucide.dev/)** — Ícones modernos

---

## 🧩 Padrões de Projeto

- **Componentização**: Componentes reutilizáveis em [`src/components`](src/components)
- **Hooks & Utils**: Funções utilitárias em [`src/lib`](src/lib)
- **Roteamento**: Definido em [`src/app.tsx`](src/app.tsx) usando React Router
- **Estilização utilitária**: Tailwind CSS e variantes de classe para máxima flexibilidade

---

## ⚡ Como rodar o projeto

1. **Clone o repositório**
   ```sh
   git clone https://github.com/sahAlves/nlw-agents-intermediario-web.git
   cd web
   ```

2. **Instale as dependências**
   ```sh
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```sh
   npm run dev
   ```

4. **Acesse:**  
   [http://localhost:5173](http://localhost:5173) (ou a porta exibida no terminal)

---

## 💡 Observações

- Certifique-se de que o backend (API) esteja rodando em `http://localhost:3333` para o funcionamento completo.
- Projeto desenvolvido durante o **NLW Agents** da Rocketseat.