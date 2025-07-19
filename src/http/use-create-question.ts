import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { createQuestionRequest } from './types/create-question-request';
import type { CreateQuestionResponse } from './types/create-question-response';
import type { GetRoomQuestionsResponse } from './types/get-room-questions-response';

// Essa função cria uma "mutation" (ação de envio de dados)
// Ela é usada para criar uma nova pergunta em uma sala específica
export function useCreateQuestion(roomId: string) {
  // Acessa o cache das queries (perguntas da sala, no caso)
  const queryClient = useQueryClient();

  // Retorna a mutation configurada com várias etapas personalizadas
  return useMutation({
    // mutationFn: o que deve acontecer quando a mutation for executada
    // Nesse caso, faz uma requisição POST para criar uma pergunta na sala
    mutationFn: async (data: createQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
          },
          body: JSON.stringify(data),
        }
      );
      // Converte a resposta da API em JSON tipado
      const result: CreateQuestionResponse = await response.json();

      return result;
    },

    // onMutate: executa **antes** da API responder, pra atualizar a interface imediatamente (otimistic update)
    onMutate({ question }) {
      // Busca no cache as perguntas atuais da sala
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
        'get-questions',
        roomId,
      ]);

      // Se não tiver nada no cache ainda, usa array vazio
      const questionsArray = questions ?? [];

      // Cria um objeto de pergunta falsa (temporária) pra mostrar na tela
      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      };

      // Atualiza o cache local com a nova pergunta no topo da lista
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-questions', roomId],
        [newQuestion, ...questionsArray]
      );

      // Retorna os dados anteriores para possível rollback se der erro
      return { newQuestion, questions };
    },

    // onSuccess: executa quando a API responde com sucesso
    onSuccess(data, _variables, context) {
      // Atualiza o cache local com os dados reais da pergunta vinda da API
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-questions', roomId],
        (questions) => {
          if (!questions) {
            return questions;
          }

          if (!context.newQuestion) {
            return questions;
          }

          // Substitui a pergunta temporária pelos dados reais
          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId,
                answer: data.answer,
                isGeneratingAnswer: false,
              };
            }

            // mantém as outras perguntas como estão
            return question;
          });
        }
      );
    },

    // onError: executa se a requisição der erro
    onError(_error, _variables, context) {
      // Se tinha perguntas anteriores salvas no contexto, volta pra elas
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ['get-questions', roomId],
          context.questions
        );
      }
    },
  });
}
