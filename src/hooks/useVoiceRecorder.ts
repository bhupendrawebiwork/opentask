// src/hooks/useVoiceRecorder.ts
"use client"
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

type UseVoiceRecorderReturn = {
  isRecording: boolean;
  isPlaying: boolean;
  transcript: string;
  audioBlob: File | null;
  setTranscript:any,
  audioRef: React.RefObject<HTMLAudioElement | null>;
  handleRecord: () => Promise<void>;
  handlePlayPause: () => void;
};

export const useVoiceRecorder = (): UseVoiceRecorderReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioBlob, setAudioBlob] = useState<File | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Setup speech recognition on first load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US'; // Change to 'hi-IN' for Hindi

        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setTranscript((prev) => prev + finalTranscript + ' ');
          }
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          toast.error('Speech recognition error. Please try again.');
        };

        recognitionRef.current = recognition;
      } else {
        console.warn('Speech recognition not supported');
        toast('Speech recognition not supported in this browser');
      }
    }
  }, []);

  const handleRecord = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Setup MediaRecorder
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const file = new File([blob], 'recording.wav', { type: 'audio/wav' });
          setAudioBlob(file);

          const audioUrl = URL.createObjectURL(blob);
          if (audioRef.current) {
            audioRef.current.src = audioUrl;
          }

          stream.getTracks().forEach((track) => track.stop());
        };

        // Start recording
        mediaRecorder.start();

        // Start speech recognition
        recognitionRef.current?.start();

        setIsRecording(true);
      } catch (error) {
        console.error('Microphone access error:', error);
        toast.error('Microphone access denied or unavailable.');
      }
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Manage playback status
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioBlob]);

  return {
    isRecording,
    isPlaying,
    transcript,
    audioBlob,
    audioRef,
    setTranscript,
    handleRecord,
    handlePlayPause,
  };
};
