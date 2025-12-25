import React, { useState, useEffect } from "react";
import { Play, Pause, Music } from "lucide-react";
import { useRef } from "react";
import {
  Heart,
  Cake,
  Star,
  Sparkles,
  Gift,
  Camera,
  MessageCircle,
  Lock,
  X,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Supabase Config
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============ COMPONENTS ============

// Loading Screen Component
const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="text-center">
        <img
          src="https://media.tenor.com/KtaMrc5ZcH4AAAAi/bubu-dudu-sseeyall.gif"
          alt="Loading"
          className="w-48 h-48 mx-auto mb-6 rounded-full"
        />
        <Cake className="w-16 h-16 animate-bounce mx-auto mb-4" style={{ color: '#AFE1AF' }} />
        <p className="text-2xl font-bold text-gray-700 mb-2">
          Memuat kenangan indah...
        </p>
        <p className="text-gray-500">Sabar ya, sebentar lagi! ✨</p>
      </div>
    </div>
  );
};

// Waiting Screen Component
const WaitingScreen = ({ daysUntil }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (!isUnlocked) {
      setIsUnlocked(true);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* AUDIO */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/music/backsound.mp3"
      />

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-xl mx-auto">
          <img
            src="https://media.tenor.com/6jNtCfLsoH4AAAAj/bubu-dudu-sseeyall.gif"
            alt="Waiting"
            className="w-56 h-56 mx-auto mb-6 rounded-2xl"
          />

          <Lock className="w-14 h-14 mx-auto mb-4" style={{ color: '#AFE1AF' }} />

          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Tunggu Sebentar Ya 🎁
          </h2>

          <p className="text-gray-600 mb-4">
            Kejutan spesial ini baru bisa dibuka pada
          </p>

          <p className="text-2xl font-bold mb-6" style={{ color: '#AFE1AF' }}>
            28 Desember 2025
          </p>

          <div className="rounded-2xl p-6 mb-4" style={{ background: 'linear-gradient(to right, #E8F5E8, #D4EDD4)' }}>
            <p className="text-5xl font-bold" style={{ color: '#6FA86F' }}>
              {daysUntil}
            </p>
            <p className="text-gray-600 mt-1">hari lagi ✨</p>
          </div>
        </div>
      </div>

      {/* 🎵 MUSIC CONTROL */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all flex items-center gap-2"
        style={{ background: 'linear-gradient(to right, #AFE1AF, #8FD18F)' }}
      >
        <Music className="w-5 h-5" />
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

// Error Component
const ErrorScreen = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
          style={{ background: 'linear-gradient(to right, #AFE1AF, #8FD18F)' }}
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
};

// Edit Modal Component
const EditModal = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description,
    category: item.category,
    type: item.type,
    url: item.url
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(item.id, formData);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">✏️ Edit Momen</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Judul
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none"
              style={{ focusBorderColor: '#AFE1AF' }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none min-h-32"
              style={{ focusBorderColor: '#AFE1AF' }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kategori
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none"
              style={{ focusBorderColor: '#AFE1AF' }}
            >
              <option value="memories">Kenangan</option>
              <option value="wishes">Ucapan</option>
              <option value="gifts">Hadiah</option>
              <option value="fun">Seru-seruan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipe
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none"
              style={{ focusBorderColor: '#AFE1AF' }}
            >
              <option value="image">Gambar</option>
              <option value="text">Teks</option>
              <option value="album">Album</option>
            </select>
          </div>

          {formData.type === "image" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL Gambar
              </label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none"
                style={{ focusBorderColor: '#AFE1AF' }}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(to right, #AFE1AF, #8FD18F)' }}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Album Modal Component
const AlbumModal = ({ album, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const photos = album.album_photos || [];
  
  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };
  
  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="max-w-4xl w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Album Frame */}
        <div className="bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 rounded-3xl shadow-2xl p-6 md:p-8 border-8 border-amber-200 relative">
          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-400 rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-400 rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-amber-400 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-400 rounded-br-2xl"></div>
          
          {/* Album Title */}
          <div className="text-center mb-6">
            <Images className="w-10 h-10 mx-auto mb-3 text-amber-600" />
            <h2 className="text-3xl font-bold text-amber-900 mb-2">{album.title}</h2>
            <p className="text-amber-700 text-sm">📸 {currentIndex + 1} dari {photos.length}</p>
          </div>

          {/* Photo Container */}
          <div className="relative bg-white rounded-2xl shadow-lg p-4 mb-4">
            <img
              src={photos[currentIndex]?.url}
              alt={photos[currentIndex]?.description}
              className="w-full h-64 md:h-96 object-cover rounded-xl"
            />
            
            {/* Navigation Buttons */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-amber-600 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-amber-600 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Description */}
          <div className="bg-white/70 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-gray-700 text-center font-medium">
              {photos[currentIndex]?.description || album.description}
            </p>
          </div>

          {/* Photo Dots Indicator */}
          {photos.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-amber-600 w-6" : "bg-amber-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white text-gray-800 w-12 h-12 rounded-full font-bold hover:bg-gray-100 shadow-lg border-4 border-amber-200 flex items-center justify-center"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// Letter Modal Component
const LetterModal = ({ wish, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Envelope */}
        <div className="rounded-t-3xl p-8 shadow-2xl border-4 border-white" style={{ background: 'linear-gradient(to bottom right, #D4EDD4, #C8E6C8)' }}>
          {/* Stamp */}
          {/* <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg transform rotate-12 text-xs font-bold border-2 border-white">
            ✉️ SPESIAL
          </div>
           */}
          {/* Letter Content */}
          <div className="bg-white rounded-2xl p-8 shadow-lg relative" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 35px, #e5e7eb 35px, #e5e7eb 36px)"
          }}>
            <div className="absolute top-0 left-0 w-full h-2 rounded-t-2xl" style={{ background: 'linear-gradient(to right, #AFE1AF, #8FD18F, #6FA86F)' }}></div>
            
            <MessageCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#AFE1AF' }} />
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {wish.title}
            </h3>
            
            <div className="prose prose-pink max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {wish.description}
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t-2" style={{ borderColor: '#D4EDD4' }}>
              <p className="text-right text-gray-500 italic">
                Dengan cinta, Dudu ❤️
              </p>
            </div>
          </div>
        </div>
        
        {/* Envelope Flap */}
        <div className="h-16 relative overflow-hidden border-4 border-t-0 border-white rounded-b-3xl" style={{ background: 'linear-gradient(to bottom, #C8E6C8, #B8DDB8)' }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(175, 225, 175, 0.5), rgba(111, 168, 111, 0.5))' }}></div>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white text-gray-800 w-12 h-12 rounded-full font-bold hover:bg-gray-100 shadow-lg border-4 flex items-center justify-center"
          style={{ borderColor: '#D4EDD4' }}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// Image Modal Component
const ImageModal = ({ image, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="max-w-4xl max-h-[90vh] relative">
        <img
          src={image.url}
          alt={image.title}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white text-gray-800 w-10 h-10 rounded-full font-bold hover:bg-gray-100"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Gift Modal Component
const GiftModal = ({ gift, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gift Box Container */}
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-3xl shadow-2xl border-4 border-amber-200 overflow-hidden flex flex-col">
          {/* Gift Image */}
          {gift.url && (
            <div className="relative bg-white m-6 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={gift.url}
                alt={gift.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              {/* Sparkle Effect */}
              <div className="absolute top-4 right-4">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
            </div>
          )}

          {/* Gift Content */}
          <div className="p-6 md:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-amber-50 max-h-[40vh]">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-inner">
              <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {gift.title}
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap text-center">
                  {gift.description}
                </p>
              </div>
            </div>
          </div>

          {/* Gift Tag */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 border-t-2 border-amber-200">
            <p className="text-center text-amber-800 font-semibold italic">
              Dari Dudu, atata atata~
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white text-gray-800 w-12 h-12 rounded-full font-bold hover:bg-gray-100 shadow-lg border-4 border-amber-200 flex items-center justify-center"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// Category Button Component
const CategoryButton = ({ category, isActive, onClick }) => {
  const Icon = category.icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
        isActive
          ? "text-white shadow-lg"
          : "bg-white text-gray-700 hover:bg-gray-50 shadow"
      }`}
      style={isActive ? { background: 'linear-gradient(to right, #AFE1AF, #8FD18F)' } : {}}
    >
      <Icon className="w-4 h-4 md:w-5 md:h-5" />
      <span className="text-sm md:text-base">{category.name}</span>
    </button>
  );
};

// Item Card Component
const ItemCard = ({ item, isAdmin, onImageClick, onEdit, onDelete, onImageUpload }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
      {item.type === "album" ? (
        <div className="relative group bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="h-64 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Album Cover Design */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-2 gap-2 p-4 h-full">
                {item.album_photos?.slice(0, 4).map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo.url}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-4 border-amber-200">
                <Images className="w-12 h-12 mx-auto mb-2 text-amber-600" />
                <p className="text-lg font-bold text-amber-900">Album 📸</p>
                <p className="text-sm text-amber-700">{item.album_photos?.length || 0} Foto</p>
              </div>
            </div>
          </div>
          
          {isAdmin && (
            <div className="absolute top-4 right-4">
              <label className="bg-white text-gray-800 px-3 py-2 rounded-full text-xs font-semibold cursor-pointer hover:bg-gray-100 shadow-lg">
                + Foto
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onImageUpload(e, item.id)}
                />
              </label>
            </div>
          )}
        </div>
      ) : item.type === "image" ? (
        <div className="relative group">
          <img
            src={item.url}
            alt={item.title}
            className="w-full h-64 object-cover cursor-pointer"
            onClick={() => onImageClick(item)}
          />
          {isAdmin && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <label className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-gray-100">
                Ganti Foto
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onImageUpload(e, item.id)}
                />
              </label>
            </div>
          )}
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center p-6 relative group" style={{ background: 'linear-gradient(to bottom right, #AFE1AF, #8FD18F, #6FA86F)' }}>
          <h3 className="text-2xl font-bold text-white text-center">
            {item.title}
          </h3>

          {isAdmin && item.category === "gifts" && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
              <label className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-gray-100">
                + Tambah Foto
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onImageUpload(e, item.id)}
                />
              </label>
            </div>
          )}
        </div>
      )}

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
          {item.title}
        </h3>
        <p className="text-sm md:text-base text-gray-600 mb-3 line-clamp-2">
          {item.description}
        </p>

          {item.category === "gifts" && item.url && (
            <button
              onClick={() => onImageClick(item)}
              className="flex-1 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(to right, #F59E0B, #D97706)' }}
            >
              🎁 Lihat Hadiah
            </button>
          )}
        
        <div className="flex gap-2">
          {item.category === "wishes" && (
            <button
              onClick={() => onImageClick(item)}
              className="flex-1 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(to right, #AFE1AF, #8FD18F)' }}
            >
              📖 Baca Surat
            </button>
          )}
          
          {item.type === "album" && (
            <button
              onClick={() => onImageClick(item)}
              className="flex-1 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all bg-gradient-to-r from-amber-400 to-orange-400"
            >
              📸 Lihat Album
            </button>
          )}
          
          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(item)}
                className="hover:opacity-80 px-3 py-2"
                style={{ color: '#6FA86F' }}
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-500 hover:text-red-600 px-3 py-2"
              >
                🗑️
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  return (
    <div className="relative overflow-hidden text-white py-12 px-4" style={{ background: 'linear-gradient(to right, #AFE1AF, #8FD18F, #6FA86F)' }}>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Cake className="w-16 h-16 animate-bounce mx-auto mb-4" />
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Selamat Ulang Tahun Tria! 🎉
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          Untuk orang spesial akuuu di hari istimewa ini ✨
        </p>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <div className="text-white py-8 mt-12" style={{ background: 'linear-gradient(to right, #AFE1AF, #8FD18F, #6FA86F)' }}>
      <div className="max-w-4xl mx-auto text-center px-4">
        <Heart
          className="w-12 h-12 mx-auto mb-4 animate-pulse"
          fill="currentColor"
        />
      </div>
    </div>
  );
};

// ============ MAIN APP ============

function App() {
  const isAdmin = window.location.pathname === "/dhikaganteng";
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedWish, setSelectedWish] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedGift, setSelectedGift] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [isDateAllowed, setIsDateAllowed] = useState(true);
  const [daysUntilBirthday, setDaysUntilBirthday] = useState(0);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showStart, setShowStart] = useState(true);

  const categories = [
    { id: "all", name: "Semua", icon: Sparkles },
    { id: "wishes", name: "Ucapan", icon: MessageCircle },
    { id: "memories", name: "Kenangan", icon: Camera },
    { id: "gifts", name: "Hadiah", icon: Gift }
  ];

  // Check if today is December 28, 2025 OR has special access
  useEffect(() => {
    const checkDate = async () => {
      try {
        const { data, error } = await supabase.rpc("get_server_date");

        if (error) throw error;

        const serverDate = new Date(data);
        const targetDate = new Date(2025, 11, 28);

        serverDate.setHours(0, 0, 0, 0);
        targetDate.setHours(0, 0, 0, 0);

        const diffTime = targetDate - serverDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setDaysUntilBirthday(diffDays);

        const urlParams = new URLSearchParams(window.location.search);
        const hasUnlockKey = urlParams.get("unlock") === "birthday2025";

        setIsDateAllowed(diffDays <= 0 || hasUnlockKey || isAdmin);
      } catch (err) {
        console.error("Date check failed:", err);
        setIsDateAllowed(false);
      }
    };

    checkDate();
  }, [isAdmin]);


  useEffect(() => {
    if (isDateAllowed) {
      loadItems();

      const subscription = supabase
        .channel("birthday_items_changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "birthday_items" },
          () => loadItems()
        )
        .subscribe();

      return () => subscription.unsubscribe();
    }
  }, [isDateAllowed]);


  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };


  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("birthday_items")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error loading items:", error);
      setError("Gagal memuat data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, itemId) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;

  const item = items.find(i => i.id === itemId);
  if (!item) return;

  // VALIDASI SIZE
  for (const file of files) {
    if (file.size > 4 * 1024 * 1024) {
      alert("Ukuran tiap file maksimal 4MB");
      return;
    }
  }

  try {
    // AMBIL FOTO EXISTING
    const currentPhotos = item.album_photos || [];
    const newPhotos = [];

    // LOOP SEMUA FILE
    for (const file of files) {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      newPhotos.push({
        url: base64,
        description: "Foto",
        created_at: new Date().toISOString(),
      });
    }

    // UPDATE SEKALI
    const { error } = await supabase
      .from("birthday_items")
      .update({
        album_photos: [...currentPhotos, ...newPhotos],
      })
      .eq("id", itemId);

    if (error) throw error;

    await loadItems();
    alert(`${newPhotos.length} foto berhasil ditambahkan ke album 📸`);

  } catch (error) {
    console.error(error);
    alert("Gagal upload foto: " + error.message);
  } finally {
    // RESET INPUT supaya bisa upload file yang sama lagi
    e.target.value = "";
  }
};


  const handleAddMoment = async () => {
    try {
      // Get the maximum ID from current items
      const maxId = items.length > 0 ? Math.max(...items.map(item => item.id)) : 0;
      
      const { error } = await supabase.from("birthday_items").insert([
        {
          id: maxId + 1, // Use next available ID
          category: "memories",
          type: "image",
          url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
          title: "Momen",
          description: "Tambahkan kenangan spesial",
        },
      ]);

      if (error) throw error;
      await loadItems();
      alert("Momen baru berhasil ditambahkan!");
    } catch (error) {
      alert("Gagal menambahkan momen: " + error.message);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!confirm("Hapus momen ini?")) return;

    try {
      const { error } = await supabase
        .from("birthday_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;
      await loadItems();
      alert("Momen berhasil dihapus!");
    } catch (error) {
      alert("Gagal menghapus momen: " + error.message);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleSaveEdit = async (itemId, formData) => {
    try {
      const { error } = await supabase
        .from("birthday_items")
        .update(formData)
        .eq("id", itemId);

      if (error) throw error;
      await loadItems();
      setEditingItem(null);
      alert("Momen berhasil diupdate!");
    } catch (error) {
      alert("Gagal mengupdate momen: " + error.message);
    }
  };

  const handleItemClick = (item) => {
    if (item.category === "wishes") {
      setSelectedWish(item);
    } else if (item.category === "gifts") {
      setSelectedGift(item);
    } else if (item.type === "album") {
      setSelectedAlbum(item);
    } else {
      setSelectedImage(item);
    }
  };

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  // Show waiting screen if date not allowed (and not admin)
  if (!isDateAllowed && !isAdmin) {
    return <WaitingScreen daysUntil={daysUntilBirthday} />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={loadItems} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />

      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/music/backsound.mp3"
      />

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-8">
          {categories.map((cat) => (
            <CategoryButton
              key={cat.id}
              category={cat}
              isActive={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>

        {/* Grid Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              isAdmin={isAdmin}
              onImageClick={handleItemClick}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onImageUpload={handleImageUpload}
            />
          ))}
        </div>

        {/* Add More Button */}
        {isAdmin && (
          <div className="text-center mt-8">
            <button
              onClick={handleAddMoment}
              className="text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              style={{ background: 'linear-gradient(to right, #AFE1AF, #8FD18F)' }}
            >
              + Tambah Momen
            </button>
          </div>
        )}
      </div>

      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all flex items-center gap-2"
        style={{ background: 'linear-gradient(to right, #AFE1AF, #8FD18F)' }}
      >
        <Music className="w-5 h-5" />
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>


      <Footer />

      {/* Modals */}
      {editingItem && (
        <EditModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveEdit}
        />
      )}

      {selectedWish && (
        <LetterModal
          wish={selectedWish}
          onClose={() => setSelectedWish(null)}
        />
      )}

      {selectedGift && (
        <GiftModal
          gift={selectedGift}
          onClose={() => setSelectedGift(null)}
        />
      )}

      {selectedImage && selectedImage.category !== "wishes" && selectedImage.category !== "gifts" && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white text-gray-800 w-10 h-10 rounded-full font-bold hover:bg-gray-100"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {selectedAlbum && (
        <AlbumModal
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      )}
    </div>
  );
}

export default App;