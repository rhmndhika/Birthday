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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="text-center">
        <img
          src="https://media.tenor.com/KtaMrc5ZcH4AAAAi/bubu-dudu-sseeyall.gif"
          alt="Loading"
          className="w-48 h-48 mx-auto mb-6 rounded-full"
        />
        <Cake className="w-16 h-16 animate-bounce mx-auto mb-4 text-pink-500" />
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
        <img
          src="https://media.tenor.com/KtaMrc5ZcH4AAAAi/bubu-dudu-sseeyall.gif"
          alt="Waiting"
          className="w-64 h-64 mx-auto mb-6 rounded-2xl"
        />
        <Lock className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Tunggu Dulu Ya! 🎁
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          Kejutan spesial ini baru bisa dibuka pada:
        </p>
        <p className="text-2xl font-bold text-pink-500 mb-4">
          28 Desember 2025
        </p>
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-4">
          <p className="text-4xl font-bold text-purple-600 mb-1">
            {daysUntil}
          </p>
          <p className="text-gray-600">hari lagi! 🎉</p>
        </div>
      </div>
    </div>
  );
};

// Error Component
const ErrorScreen = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
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
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
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
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none min-h-32"
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
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
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
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
            >
              <option value="image">Gambar</option>
              <option value="text">Teks</option>
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Simpan
            </button>
          </div>
        </form>
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
        <div className="bg-gradient-to-br from-pink-200 to-purple-200 rounded-t-3xl p-8 shadow-2xl border-4 border-white">
          {/* Stamp */}
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg transform rotate-12 text-xs font-bold border-2 border-white">
            ✉️ SPESIAL
          </div>
          
          {/* Letter Content */}
          <div className="bg-white rounded-2xl p-8 shadow-lg relative" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 35px, #e5e7eb 35px, #e5e7eb 36px)"
          }}>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-t-2xl"></div>
            
            <MessageCircle className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {wish.title}
            </h3>
            
            <div className="prose prose-pink max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {wish.description}
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t-2 border-pink-200">
              <p className="text-right text-gray-500 italic">
                Dengan cinta, Dudu ❤️
              </p>
            </div>
          </div>
        </div>
        
        {/* Envelope Flap */}
        <div className="h-16 bg-gradient-to-b from-pink-300 to-pink-400 relative overflow-hidden border-4 border-t-0 border-white rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400/50 to-purple-400/50"></div>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white text-gray-800 w-12 h-12 rounded-full font-bold hover:bg-gray-100 shadow-lg border-4 border-pink-200 flex items-center justify-center"
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

// Category Button Component
const CategoryButton = ({ category, isActive, onClick }) => {
  const Icon = category.icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
        isActive
          ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
          : "bg-white text-gray-700 hover:bg-gray-50 shadow"
      }`}
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
      {item.type === "image" ? (
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
        <div className="h-64 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 flex items-center justify-center p-6">
          <h3 className="text-2xl font-bold text-white text-center">
            {item.title}
          </h3>
        </div>
      )}

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
          {item.title}
        </h3>
        <p className="text-sm md:text-base text-gray-600 mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex gap-2">
          {item.category === "wishes" && (
            <button
              onClick={() => onImageClick(item)}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all"
            >
              📖 Baca Surat
            </button>
          )}
          
          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(item)}
                className="text-purple-500 hover:text-purple-600 px-3 py-2"
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
    <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-12 px-4">
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
    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-8 mt-12">
      <div className="max-w-4xl mx-auto text-center px-4">
        <Heart
          className="w-12 h-12 mx-auto mb-4 animate-pulse"
          fill="currentColor"
        />
        <p className="text-lg md:text-xl font-semibold mb-2">
          Dibuat dengan ❤️ untuk hari spesialmu
        </p>
      </div>
    </div>
  );
};

// ============ MAIN APP ============

function App() {
  const isAdmin = window.location.pathname === "/admin";
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedWish, setSelectedWish] = useState(null);
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
    { id: "memories", name: "Kenangan", icon: Camera }
  ];

  // Check if today is December 28, 2025 OR has special access
  useEffect(() => {
    const checkDate = () => {
      const today = new Date();
      const targetDate = new Date(2025, 11, 28); // December 28, 2025
      
      // Set both dates to midnight for accurate comparison
      today.setHours(0, 0, 0, 0);
      targetDate.setHours(0, 0, 0, 0);
      
      const diffTime = targetDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setDaysUntilBirthday(diffDays);
      
      // Check for special access methods:
      // 1. URL parameter: ?unlock=birthday2025
      // 2. Admin access
      // 3. Date is reached
      const urlParams = new URLSearchParams(window.location.search);
      const hasUnlockKey = urlParams.get('unlock') === 'birthday2025';
      
      setIsDateAllowed(diffDays <= 0 || hasUnlockKey || isAdmin);
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
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert("Ukuran file maksimal 4MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const { error } = await supabase
          .from("birthday_items")
          .update({ url: event.target.result })
          .eq("id", itemId);

        if (error) throw error;
        await loadItems();
        alert("Foto berhasil diupdate!");
      } catch (error) {
        alert("Gagal mengupdate foto: " + error.message);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddMoment = async () => {
    try {
      const { error } = await supabase.from("birthday_items").insert([
        {
          category: "memories",
          type: "image",
          url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
          title: "Momen Baru",
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
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
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              + Tambah Momen
            </button>
          </div>
        )}
      </div>

      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all flex items-center gap-2"
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

      {selectedImage && selectedImage.category !== "wishes" && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

export default App;