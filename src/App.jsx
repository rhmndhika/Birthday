import React, { useState, useEffect } from "react";
import {
  Heart,
  Cake,
  Star,
  Sparkles,
  Gift,
  Camera,
  MessageCircle,
  Lock,
  User,
  Edit2,
  Save,
  X,
} from "lucide-react";

const BirthdaySurprise = () => {
  const isAdmin = window.location.pathname === "/admin";
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "memories",
  });

  const categories = [
    { id: "all", name: "Semua", icon: Sparkles },
    { id: "memories", name: "Kenangan", icon: Camera },
    { id: "wishes", name: "Ucapan", icon: MessageCircle },
    { id: "gifts", name: "Hadiah", icon: Gift },
    { id: "fun", name: "Seru-seruan", icon: Star },
  ];

  const defaultItems = [
    {
      id: 1,
      category: "memories",
      type: "image",
      url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
      title: "Momen Spesial",
      description: "Kenangan indah kita bersama",
    },
    {
      id: 2,
      category: "wishes",
      type: "text",
      title: "Selamat Ulang Tahun! 🎂",
      description:
        "Semoga semua impianmu tercapai, sehat selalu, dan bahagia selamanya!",
    },
    {
      id: 3,
      category: "memories",
      type: "image",
      url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
      title: "Petualangan Kita",
      description: "Tempat favorit kita",
    },
    {
      id: 4,
      category: "fun",
      type: "image",
      url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800",
      title: "Tawa & Canda",
      description: "Moment lucu yang tak terlupakan",
    },
    {
      id: 5,
      category: "gifts",
      type: "text",
      title: "Hadiah Spesial 🎁",
      description: "Aku sudah siapkan sesuatu yang spesial untukmu!",
    },
    {
      id: 6,
      category: "memories",
      type: "image",
      url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800",
      title: "Sweet Moments",
      description: "Kebersamaan yang manis",
    },
  ];

  const [items, setItems] = useState([]);

  // Check if window.storage is available (Claude Artifacts) or use localStorage
  const isClaudeArtifact = typeof window.storage !== "undefined";

  // Load data dari storage
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);

      if (isClaudeArtifact) {
        // Use window.storage (Claude Artifacts - shared storage)
        try {
          const result = await window.storage.get("birthday-items", true);
          if (result && result.value) {
            setItems(JSON.parse(result.value));
          } else {
            setItems(defaultItems);
            await window.storage.set(
              "birthday-items",
              JSON.stringify(defaultItems),
              true
            );
          }
        } catch (error) {
          console.log("Using default items");
          setItems(defaultItems);
        }
      } else {
        // Use localStorage (Local development)
        const saved = localStorage.getItem("birthday-items");
        if (saved) {
          setItems(JSON.parse(saved));
        } else {
          setItems(defaultItems);
          localStorage.setItem("birthday-items", JSON.stringify(defaultItems));
        }
      }
    } catch (error) {
      console.error("Error loading items:", error);
      setItems(defaultItems);
    } finally {
      setLoading(false);
    }
  };

  const saveItems = async (newItems) => {
    try {
      if (isClaudeArtifact) {
        // Save to window.storage (Claude Artifacts - shared)
        await window.storage.set(
          "birthday-items",
          JSON.stringify(newItems),
          true
        );
      } else {
        // Save to localStorage (Local development)
        localStorage.setItem("birthday-items", JSON.stringify(newItems));
      }
      setItems(newItems);
    } catch (error) {
      console.error("Error saving:", error);
      alert("Gagal menyimpan perubahan. Error: " + error.message);
    }
  };

  const handleImageUpload = async (e, itemId) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert("Ukuran file maksimal 4MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const newItems = items.map((item) =>
          item.id === itemId ? { ...item, url: event.target.result } : item
        );
        await saveItems(newItems);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMoment = async () => {
    const newId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newItems = [
      ...items,
      {
        id: newId,
        category: "memories",
        type: "image",
        url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
        title: "Momen Baru",
        description: "Tambahkan kenangan spesial",
      },
    ];
    await saveItems(newItems);
  };

  const handleDeleteItem = async (itemId) => {
    if (confirm("Hapus momen ini?")) {
      const newItems = items.filter((item) => item.id !== itemId);
      await saveItems(newItems);
    }
  };

  const startEdit = (item) => {
    setEditingItem(item.id);
    setEditForm({
      title: item.title,
      description: item.description,
      category: item.category,
    });
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditForm({ title: "", description: "", category: "memories" });
  };

  const saveEdit = async (itemId) => {
    const newItems = items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            title: editForm.title,
            description: editForm.description,
            category: editForm.category,
          }
        : item
    );
    await saveItems(newItems);
    setEditingItem(null);
  };

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <Cake className="w-16 h-16 animate-bounce mx-auto mb-4 text-pink-500" />
          <p className="text-xl font-semibold text-gray-700">
            Memuat kenangan...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Admin/User Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg ${
            isAdmin
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {isAdmin ? (
            <Lock className="w-4 h-4" />
          ) : (
            <User className="w-4 h-4" />
          )}
          <span className="text-sm font-semibold">
            {isAdmin ? "Mode Admin" : "Mode User"}
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-12 px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 animate-bounce">
            <Heart className="w-8 h-8" fill="currentColor" />
          </div>
          <div className="absolute top-20 right-20 animate-pulse">
            <Star className="w-6 h-6" fill="currentColor" />
          </div>
          <div className="absolute bottom-10 left-1/4 animate-bounce delay-100">
            <Cake className="w-10 h-10" />
          </div>
          <div className="absolute bottom-20 right-1/3 animate-pulse delay-200">
            <Sparkles className="w-7 h-7" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-4">
            <Cake className="w-16 h-16 animate-bounce" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Selamat Ulang Tahun! 🎉
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Untuk orang spesial di hari istimewa ✨
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow"
                }`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Grid Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              {item.type === "image" ? (
                <div className="relative group">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-64 object-cover cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  />
                  {isAdmin && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <label className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-gray-100">
                        Ganti Foto
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, item.id)}
                        />
                      </label>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-64 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 flex items-center justify-center p-6">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  </div>
                </div>
              )}

              <div className="p-4 md:p-6">
                {editingItem === item.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Judul"
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                      rows="3"
                      placeholder="Deskripsi"
                    />
                    <select
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      {categories
                        .filter((c) => c.id !== "all")
                        .map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(item.id)}
                        className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Simpan
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 flex-1">
                        {item.title}
                      </h3>
                      {isAdmin && (
                        <button
                          onClick={() => startEdit(item)}
                          className="text-purple-500 hover:text-purple-600 ml-2"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <p className="text-sm md:text-base text-gray-600 mb-3">
                      {item.description}
                    </p>
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-500 hover:text-red-600 text-sm font-semibold"
                      >
                        Hapus
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add More Button - Only for Admin */}
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

      {/* Footer */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Heart
            className="w-12 h-12 mx-auto mb-4 animate-pulse"
            fill="currentColor"
          />
          <p className="text-lg md:text-xl font-semibold mb-2">
            Dibuat dengan ❤️ untuk hari spesialmu
          </p>
          {!isAdmin && (
            <p className="text-sm opacity-80 mt-4">
              Ingin mengedit? Buka{" "}
              <span className="font-mono bg-white/20 px-2 py-1 rounded">
                /admin
              </span>{" "}
              di URL
            </p>
          )}
          <p className="text-xs opacity-70 mt-4">
            💾{" "}
            {isClaudeArtifact
              ? "Semua perubahan tersimpan dan bisa dilihat semua orang"
              : "Mode development: Data tersimpan di browser lokal"}
          </p>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
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
    </div>
  );
};

export default BirthdaySurprise;
