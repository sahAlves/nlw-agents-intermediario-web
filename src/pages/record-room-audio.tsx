/** biome-ignore-all lint/suspicious/noConsole: ignorando todos os console.log */
import { useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Verifica se o navegador suporta gravação de áudio
const isRecordingSupported =
  !!navigator.mediaDevices && // se o navegador tem acesso a microfone
  typeof navigator.mediaDevices.getUserMedia === 'function' && // pode pegar áudio
  typeof window.MediaRecorder === 'function'; // consegue gravar áudio

// Define o tipo dos parâmetros da URL (espera um roomId)
type RoomParams = {
  roomId: string;
};

// Componente principal: grava áudio para uma sala específica
export function RecordRoomAudio() {
  const params = useParams<RoomParams>();
  // Estado que controla se está gravando ou não
  const [isRecording, setIsRecording] = useState(false);
  // Ref que guarda o gravador (MediaRecorder)
  const recorder = useRef<MediaRecorder | null>(null);
  // Ref para armazenar o intervalo que reinicia a gravação a cada 5s
  const intervalRef = useRef<NodeJS.Timeout>(null);

  // Para a gravação atual
  function stopRecording() {
    setIsRecording(false); // muda estado para parado

    // Se estiver gravando, para o MediaRecorder
    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop();
    }

    // Cancela o intervalo que reiniciava a gravação
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  // Envia o áudio para a API
  async function uploadAudio(audio: Blob) {
    // prepara dados como se fosse um formulário
    const formData = new FormData();
    // anexa o áudio
    formData.append('file', audio, 'audio.webm');

    // Envia o áudio para o servidor (para a sala atual)
    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();

    console.log(result);
  }

  // Cria e configura o MediaRecorder (gravador de áudio)
  function createRecorder(audio: MediaStream) {
    // Inicializa o gravador com qualidade e formato definidos
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    });

    // Quando terminar um pedaço da gravação, envia para o backend
    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data); // envia o pedaço gravado
      }
    };

    recorder.current.onstart = () => {
      console.log('Gravação iniciada!');
    };

    recorder.current.onstop = () => {
      console.log('Gravação encerrada/pausada');
    };

    recorder.current.start();
  }

  async function startRecording() {
    // Se o navegador não suporta gravação, mostra alerta
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação');
      return;
    }
    setIsRecording(true); // muda o estado para "gravando"

    // Solicita acesso ao microfone com configurações específicas
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true, // remove eco
        noiseSuppression: true, // reduz ruído
        sampleRate: 44_100, // qualidade da amostragem
      },
    });

    // Cria o gravador com o áudio capturado
    createRecorder(audio);

    // A cada 5 segundos, para e reinicia a gravação
    intervalRef.current = setInterval(() => {
      recorder.current?.stop(); // envia o áudio atual
      createRecorder(audio); // inicia um novo ciclo de gravação
    }, 5000);
  }

  // Se não tiver roomId na URL, redireciona para a home
  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording}>Pausar gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar áudio</Button>
      )}
      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </div>
  );
}
