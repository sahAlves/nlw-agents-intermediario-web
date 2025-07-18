import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateRoomRequest } from './types/create-room-request';
import type { CreateRoomResponse } from './types/create-room-response';

// Hook personalizado para criar uma nova sala
export function useCreateRoom() {
  // Acesso ao React Query para poder atualizar ou limpar dados em cache
  const queryClient = useQueryClient();

  // Retorna uma mutation (ação que altera algo, como POST, PUT, DELETE)
  return useMutation({
    // Função que faz a requisição para criar a sala (mutationFn = o que será executado)
    mutationFn: async (data: CreateRoomRequest) => {
      // Faz a requisição POST para a API, enviando os dados do formulário
      const response = await fetch('http://localhost:3333/rooms', {
        method: 'POST', // tipo da requisição (criação)
        headers: {
          'Content-Type': 'Application/json', // informa que está enviando JSON
        },
        body: JSON.stringify(data), // transforma os dados em JSON
      });

      // Converte a resposta da API para objeto JavaScript
      const result: CreateRoomResponse = await response.json();

      // Retorna o resultado da criação
      return result;
    },

    // Quando a criação for bem-sucedida (onSuccess)
    onSuccess: () => {
      // Invalida (atualiza) o cache da lista de salas
      // Faz com que o React Query busque de novo os dados atualizados
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] });
    },
  });
}
