  "use client";

  import React from "react";
  import Image from "next/image";
  import { useRouter } from "next/navigation";
  import {
    BadgeCheck,
    Star,
    Mic,
    Pencil,
    RefreshCcw,
    MessageCircle,
  } from "lucide-react";

  interface TradieApplicationCardProps {
    profileImage: string;
    name: string;
    rating: number;
    isVerified?: boolean;
    email?: string;
    contactNumber?: string;
    voiceNoteUrl?: string;
    transcript: string;
    priceQuote: string;
    onEditTranscript?: () => void;
    onReRecord?: () => void;
  }

  export default function TradieProfileCard({
    profileImage,
    name,
    rating,
    isVerified = false,
    email,
    contactNumber,
    voiceNoteUrl,
    transcript,
    priceQuote,
    onEditTranscript,
    onReRecord,
  }: TradieApplicationCardProps) {
    const router = useRouter();

    return (
      <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 flex flex-col gap-4 mb-6 w-full relative">
        {/* Profile Section */}
        <div className="flex items-start gap-4">
          <Image
            src={profileImage}
            alt={name}
            width={64}
            height={64}
            className="rounded-full object-cover border border-gray-300"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-gray-800">{name}</h3>
              {isVerified && <BadgeCheck className="text-blue-600" size={18} />}
            </div>
            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-2 gap-y-1">
              {email && <span>{email}</span>}
              {email && contactNumber && <span className="mx-1">|</span>}
              {contactNumber && <span>{contactNumber}</span>}
              {(email || contactNumber) && <span className="mx-1">|</span>}
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {rating.toFixed(1)} / 5.0
              </span>
            </div>
          </div>
        </div>

        {/* Voice Note Section */}
        <div className="flex items-center gap-2">
          <Mic className="text-blue-500" size={18} />
          {voiceNoteUrl ? (
            <audio controls src={voiceNoteUrl} className="w-full max-w-xs">
              Your browser does not support the audio element.
            </audio>
          ) : (
            <span className="text-sm text-gray-500 italic">No voice note</span>
          )}
          {onReRecord && (
            <button
              onClick={onReRecord}
              className="ml-auto flex items-center text-xs text-red-500 hover:underline"
            >
              <RefreshCcw size={14} className="mr-1" /> Re-record
            </button>
          )}
        </div>

        {/* Transcript Section */}
        <div className="bg-gray-50 border border-gray-200 p-3 rounded-md text-sm text-gray-700">
          <span className="block mb-1 font-medium text-gray-600">Transcript:</span>
          <p className="whitespace-pre-wrap">{transcript}</p>
          {onEditTranscript && (
            <button
              onClick={onEditTranscript}
              className="mt-2 flex items-center text-xs text-blue-500 hover:underline"
            >
              <Pencil size={14} className="mr-1" />
              Edit Transcript
            </button>
          )}
        </div>

        {/* Price Quote */}
      

        {/* CTA Button aligned bottom right */}
        <div className="flex justify-between">
          <div className="text-sm text-gray-700">
          <span className="font-semibold">Quoted Price:</span>{" "}
          <span className="text-green-600 font-semibold">
            {priceQuote || "Not provided"}
          </span>
        </div>
        <div className="flex justify-end gap-4">
        <div>
          <button
            onClick={() => router.push("/message")}
            className="inline-flex items-center gap-2 text-sm bg-blue-500 text-white py-2 px-4 rounded-lg transition hover:bg-gray-900"
          >
            
            Approve
          </button>
          </div>
        <div>
          <button
            onClick={() => router.push("/message")}
            className="inline-flex items-center gap-2 text-sm bg-black text-white py-2 px-4 rounded-lg transition hover:bg-gray-900"
          >
            <MessageCircle size={16} />
            Chat with Tradie
          </button>
          </div>
          </div>
        </div>
      </div>
    );
  }
