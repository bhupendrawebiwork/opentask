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
  RefreshCcw,
} from "lucide-react";
import { useState, useRef } from "react";

export default function JobApplicationOverlay({ onClose }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleRecord = () => {
    setIsRecording(!isRecording);

    // You'd use MediaRecorder API here in real case
    if (!isRecording) {
      setTimeout(() => {
        setAudioBlob("dummy-blob.mp3"); // Replace with actual blob
        setTranscript(
          "Namaste, Imran hoon. 10 saal se kaam kar raha hoon. Kal 11 baje aa sakta hoon."
        );
        setIsRecording(false);
      }, 3000);
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

  const handleDelete = () => {
    setAudioBlob(null);
    setTranscript("");
    setIsPlaying(false);
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
              size={20}
              className="text-white p-1 fill-white cursor-pointer bg-blue-500 rounded-full"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 my-4" />

        {/* Form */}
        <h2 className="text-2xl font-semibold text-black mt-6 mb-4">
          Apply for job
        </h2>
        <form className="space-y-6">
          {/* Budget */}
          <div>
            <label className="text-sm font-bold text-gray-700">Budget</label>
            <input
              type="text"
              placeholder="Budget"
              className="w-full text-sm mt-1 border border-blue-300 px-4 py-2 rounded-lg focus:ring-blue-400 focus:ring-2 outline-none"
            />
          </div>

          {/* Cost Type */}
          <div>
            <label className="text-sm font-bold text-gray-700">Cost Type</label>
            <select className="w-full mt-1 border border-blue-300 px-4 py-2 rounded-lg focus:ring-blue-400 focus:ring-2 outline-none text-sm text-gray-500">
              <option>Select Cost Type</option>
              <option>Hourly</option>
              <option>Fixed</option>
            </select>
          </div>

          {/* Completion Date */}
          <div>
            <label className="text-sm font-bold text-gray-700">
              Expected completion date
            </label>
            <input
              type="date"
              className="w-full mt-1 border border-blue-300 px-4 py-2 rounded-lg focus:ring-blue-400 focus:ring-2 outline-none text-sm text-gray-500"
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
            {/* Dummy audio player (you'll use actual blob in real app) */}
            {audioBlob && (
              <audio ref={audioRef} src="/dummy.mp3" className="hidden" />
            )}
          </div>

          {/* Transcript */}
          {audioBlob && (
            <div className="mt-4">
              <label className="text-sm font-bold text-gray-700">
                Edit Transcript
              </label>
              <textarea
                rows={5}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="w-full mt-1 border border-blue-300 px-4 py-2 rounded-lg focus:ring-blue-400 focus:ring-2 outline-none resize-none text-sm text-gray-500"
              />
            </div>
          )}

          {/* Comment */}
          <div>
            <label className="text-sm font-bold text-gray-700">
              Additional Comments
            </label>
            <textarea
              rows={4}
              className="w-full mt-1 border border-blue-300 px-4 py-2 rounded-lg focus:ring-blue-400 focus:ring-2 outline-none resize-none text-sm text-gray-500"
              placeholder="Comment for budget and other specifications"
            ></textarea>
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
