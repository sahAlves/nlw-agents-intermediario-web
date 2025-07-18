import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { useCreateRoom } from '@/http/use-create-room';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';


// Cria um esquema de validação usando Zod para o formulário de criação de sala
const createRoomSchema = z.object({
  name: z.string().min(3, { message: 'Inclua no mínimo 3 caracteres' }),
  description: z.string(),
});

// Cria um tipo TypeScript com base no esquema acima
type CreateRoomFormData = z.infer<typeof createRoomSchema>;

// Componente do formulário para criar uma sala
export function CreateRoomForm() {
  // Hook personalizado para criar uma sala (provavelmente faz uma chamada à API)
  const { mutateAsync: CreateRoom } = useCreateRoom();

  // Inicializa o React Hook Form com:
  // - o tipo do formulário
  // - o validador Zod (resolver)
  // - os valores padrões dos campos
  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema), // Usa o esquema Zod para validar
    defaultValues: {
      name: '',         // Começa com campo "name" vazio
      description: '',  // Campo "description" também vazio
    },
  });

  // Função que será chamada ao enviar o formulário
  // Recebe os dados do formulário já validados
  async function handleCreateRoom({ name, description }: CreateRoomFormData) {
    // Chama a função para criar a sala com os dados informados
    await CreateRoom({ name, description });

    // Limpa os campos do formulário após o envio
    createRoomForm.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Sala</CardTitle>
        <CardDescription>
          Crie uma nova sala para começar a fazer perguntas e receber respostas
          da I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome da sala</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome da sala..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button className="w-full" type="submit">
              Criar sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
