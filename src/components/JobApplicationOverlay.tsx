"use client";
import {
  CheckCircle,
  Star,
  Heart,
  ArrowLeft,
  Mic,
  Trash2,
  Play,
  Pause,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useBidStore } from "@/store/useBidStore"; // ✅ import store
import { toast } from "react-toastify";

export default function JobApplicationOverlay({
  onClose,
  taskId,
}: {
  onClose: () => void;
  taskId: string;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<File | null>(null);
  const [transcript, setTranscript] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [offeredPrice, setOfferedPrice] = useState("");
  const [costType, setCostType] = useState(""); // optional
  const [estimatedTime, setEstimatedTime] = useState(""); // in hours
  const [comment, setComment] = useState("");

  const { submitBid } = useBidStore();

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        // recognition.lang = "en-US"; // You can change this to 'hi-IN' for Hindi
        const userLang = navigator.language || navigator.userLanguage;
        recognition.lang = userLang.startsWith("hi") ? "hi-IN" : "en-US";

        recognition.onresult = (event) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setTranscript((prev) => prev + finalTranscript + " ");
          }
        };

        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          toast.error("Speech recognition error. Please try again.");
        };

        recognitionRef.current = recognition;
      } else {
        console.warn("Speech recognition not supported");
        toast.warning("Speech recognition not supported in this browser");
      }
    }
  }, []);

  const handleRecord = async () => {
    if (isRecording) {
      // Stop recording
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop(); // gracefully reset any previous instance
          } catch (e) {
            console.warn("Error stopping previous recognition", e);
          }

          recognitionRef.current.start();
        }
        // Start audio recording
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          if (recognitionRef.current) {
            recognitionRef.current.stop();
          }
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          const audioFile = new File([audioBlob], "recording.wav", {
            type: "audio/wav",
          });
          setAudioBlob(audioFile);

          // Create audio URL for playback
          const audioUrl = URL.createObjectURL(audioBlob);
          if (audioRef.current) {
            audioRef.current.src = audioUrl;
          }

          // Stop all tracks
          stream.getTracks().forEach((track) => track.stop());
        };

        // Start speech recognition

        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch (err) {
            console.warn("Error stopping previous recognition", err);
          }
          recognitionRef.current.start();
        }

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        toast.error("Could not access microphone. Please check permissions.");
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

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [audioBlob]);

  const handleDelete = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setAudioBlob(null);
    setTranscript("");
    setIsPlaying(false);
    audioChunksRef.current = [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("offeredPrice", offeredPrice);
    formData.append("offeredEstimatedTime", estimatedTime);
    formData.append("comment", transcript || comment);
    formData.append("taskId", taskId);
    // Optional: formData.append("status", "APPLY");

    // Simulate file upload (audio or image)
    if (audioBlob) formData.append("refWorkItems", audioBlob);

    const res = await submitBid(formData);

    if (res?.status === 201) {
      toast.success("Bid created successfully!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/30 flex justify-end">
      <div className="w-full max-w-xl bg-white h-full p-6 overflow-y-auto rounded-l-3xl shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4">
            <ArrowLeft
              className="cursor-pointer text-gray-600 hover:text-black"
              size={22}
              onClick={onClose}
            />
            <div>
              <h2 className="text-xl font-semibold text-black">
                Google Sheet automation AI
              </h2>
              <div className="flex items-center text-sm mt-2 gap-4">
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <CheckCircle size={16} /> Payment Verified
                </span>
                <span className="flex text-yellow-500">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                  <Star size={14} strokeWidth={1.5} />
                </span>
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-400 flex gap-6 mt-2">
            Posted 6 hours ago
            <Heart
              className="text-white p-1 fill-white cursor-pointer bg-blue-500 rounded-full"
              size={20}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 my-4" />

        {/* Form */}
        <h2 className="text-2xl font-semibold text-black mt-6 mb-4">
          Apply for job
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Budget */}
          <div>
            <label className="text-sm font-bold text-gray-700">Budget</label>
            <input
              type="number"
              value={offeredPrice}
              onChange={(e) => setOfferedPrice(e.target.value)}
              placeholder="Budget"
              className="w-full text-sm mt-1 border border-blue-300 px-4 py-2 rounded-lg focus:ring-blue-400 focus:ring-2 outline-none"
            />
          </div>

          {/* Cost Type */}
          <div>
            <label className="text-sm font-bold text-gray-700">
              Estimated Time (in hours)
            </label>
            <input
              type="number"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              placeholder="e.g., 12"
              className="w-full text-sm mt-1 border border-blue-300 px-4 py-2 rounded-lg focus:ring-blue-400 focus:ring-2 outline-none"
            />
          </div>

          {/* Voice Message */}
          <div>
            <label className="text-sm font-bold text-gray-700">
              Voice Message Application
            </label>
            <div className="mt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={handleRecord}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white ${
                  isRecording ? "bg-red-500 animate-pulse" : "bg-blue-500"
                }`}
              >
                <Mic size={18} />
                {isRecording ? "Recording..." : "Record Voice"}
              </button>

              {audioBlob && (
                <>
                  <button
                    type="button"
                    onClick={handlePlayPause}
                    className="p-2 bg-gray-100 rounded-full border hover:bg-gray-200"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="p-2 bg-red-100 rounded-full border hover:bg-red-200"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </>
              )}
            </div>
            {audioBlob && <audio ref={audioRef} className="hidden" />}
          </div>

          {/* Transcript */}
          {(audioBlob || transcript) && (
            <div className="mt-4">
              <label className="text-sm font-bold text-gray-700">
                Edit Transcript
              </label>
              <textarea
                rows={5}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="w-full mt-1 border border-blue-300 px-4 py-2 rounded-lg focus:ring-blue-400 focus:ring-2 outline-none resize-none text-sm text-gray-500"
                placeholder="Your speech will appear here..."
              />
            </div>
          )}

          {/* Additional Comments */}
          <div>
            <label className="text-sm font-bold text-gray-700">
              Additional Comments
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full mt-1 border border-blue-300 px-4 py-2 rounded-lg focus:ring-blue-400 focus:ring-2 outline-none resize-none text-sm text-gray-500"
              placeholder="Comment for budget and other specifications"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-8 py-3 rounded-xl hover:bg-blue-600 transition font-semibold"
            >
              Apply Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 