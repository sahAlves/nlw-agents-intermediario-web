import { useQuery } from '@tanstack/react-query';
import type { GetRoomsResponse } from './types/get-rooms-response';

// Hook personalizado para buscar a lista de salas (rooms)
export function useRooms() {
  // Usa o hook useQuery do React Query para buscar dados da API
  return useQuery({
    // Chave única que identifica essa consulta no cache
    // Serve para que o React Query saiba qual dado armazenar ou atualizar
    queryKey: ['get-rooms'],

    // Função que será executada para buscar os dados
    queryFn: async () => {
      // Faz uma requisição GET para buscar as salas
      const response = await fetch('http://localhost:3333/rooms');

      // Converte a resposta da API para objeto JavaScript
      const result: GetRoomsResponse = await response.json();

      // Retorna os dados para o React Query armazenar
      return result;
    },
  });
}
