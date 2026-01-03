import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Save, LogOut, LayoutDashboard, Package, Edit, Upload, AlertTriangle, Database, X } from 'lucide-react';
import { db, auth } from './config/firebaseConfig';
import { cloudinaryConfig } from './config/cloudinaryConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// --- CATEGORÍAS Y PRODUCTOS DE EJEMPLO (usados para la importación) ---
const CATEGORIES = ["Todos", "Bomboneras", "Barras", "Cubanitos", "Alfajores", "Personalizados", "Navidad"];
const PRODUCTS = [
  { id: 101, name: "Bombonera Clásica (x6)", description: "Selección de 6 bombones de autor con rellenos surtidos (dulce de leche, maracuyá, frutos rojos).", price: 8500, category: "Bomboneras", image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
  { id: 102, name: "Bombonera Personalizada (x6)", description: "6 bombones con letras o detalles personalizados. Ideal para nombres o fechas especiales.", price: 10500, category: "Bomboneras", image: "https://images.unsplash.com/photo-1526081347589-7fa3cbcd1f5c?auto=format&fit=crop&q=80&w=800", rating: 5, tag: "A Medida" },
  { id: 103, name: "Gran Bombonera Royal (x12)", description: "La experiencia completa. 12 piezas de arte en chocolate, incluyendo ediciones limitadas.", price: 16000, category: "Bomboneras", image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80&w=800", rating: 5 },
  { id: 201, name: "Barra Dark 70% Amazonas", description: "Chocolate amargo intenso con notas frutales y un toque de sal marina.", price: 4500, category: "Barras", image: "https://images.unsplash.com/photo-1621255535312-320d7ce47f4e?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
  { id: 202, name: "Barra White & Pistacho", description: "Cremoso chocolate blanco infusionado con vainilla y trozos de pistacho tostado.", price: 4800, category: "Barras", image: "https://images.unsplash.com/photo-1614088685112-0a760b7163c8?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
  { id: 203, name: "Barra Milk & Avellanas", description: "Clásico chocolate con leche enriquecido con avellanas enteras caramelizadas.", price: 4600, category: "Barras", image: "https://images.unsplash.com/photo-1582176604862-2311658cb6ae?auto=format&fit=crop&q=80&w=800", rating: 4.7 },
  { id: 204, name: "Barra Blend de Autor", description: "Nuestra creación secreta: mezcla de chocolates con trozos de cookies y caramelo.", price: 5000, category: "Barras", image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=800", rating: 5 },
  { id: 301, name: "Pack Cubanitos Degustación", description: "Pack pequeño ideal para probar. Rellenos de abundante dulce de leche.", price: 3500, category: "Cubanitos", image: "https://images.unsplash.com/photo-1615486372146-5c5b525d886e?auto=format&fit=crop&q=80&w=800", rating: 4.6 },
  { id: 302, name: "Pack Cubanitos Bañados", description: "Cubanitos rellenos sumergidos en baño de repostería semiamargo premium.", price: 4200, category: "Cubanitos", image: "https://images.unsplash.com/photo-1627993416075-87d3df626c1d?auto=format&fit=crop&q=80&w=800", rating: 4.8, tag: "Favorito" },
  { id: 303, name: "Torre de Cubanitos XL", description: "La opción familiar. Gran cantidad de cubanitos surtidos para compartir.", price: 7500, category: "Cubanitos", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
  { id: 401, name: "Oreo Bañada White (x3)", description: "Pack de 3 Oreos bañadas en exquisito chocolate blanco belga.", price: 2800, category: "Alfajores", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800", rating: 4.7 },
  { id: 402, name: "Oreo Bañada Dark (x3)", description: "Pack de 3 Oreos sumergidas en chocolate semiamargo intenso.", price: 2800, category: "Alfajores", image: "https://images.unsplash.com/photo-1594911762299-7f51954388dc?auto=format&fit=crop&q=80&w=800", rating: 4.7 },
  { id: 403, name: "Oreo Box Mix (x6)", description: "Lo mejor de dos mundos: 3 bañadas en blanco y 3 en semiamargo.", price: 5200, category: "Alfajores", image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
  { id: 501, name: "Caja Mensaje 'Te Amo'", description: "Dilo con chocolate. Letras de chocolate formando la frase + corazones rellenos.", price: 12000, category: "Personalizados", image: "https://images.unsplash.com/photo-1518197648727-9c200763ef95?auto=format&fit=crop&q=80&w=800", rating: 5, tag: "Regalo Ideal" },
  { id: 502, name: "Caja 'Feliz Cumpleaños'", description: "Colorida y festiva. Bombones y mensaje de chocolate para celebrar la vida.", price: 12500, category: "Personalizados", image: "https://images.unsplash.com/photo-1549400244-a95782782927?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
  { id: 503, name: "Caja Frase Personalizada", description: "Tú eliges el texto (hasta 10 caracteres). Nosotros lo convertimos en sabor.", price: 13500, category: "Personalizados", image: "https://images.unsplash.com/photo-1623863777553-659f1f0a1040?auto=format&fit=crop&q=80&w=800", rating: 5 },
  { id: 601, name: "Christmas Special Box", description: "Edición Limitada. Pan dulce, turrones artesanales y figuras navideñas de chocolate.", price: 18000, category: "Navidad", image: "https://images.unsplash.com/photo-1512504787966-22a452ae0071?auto=format&fit=crop&q=80&w=800", rating: 5, tag: "Edición Limitada" }
];

// --- Custom Confirmation Modal ---
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, type = 'info', confirmText }) => {
  if (!isOpen) return null;
  
  const isError = type === 'error';
  const isDelete = type === 'delete';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden transform transition-all scale-100 border border-white/20">
        <div className={`h-2 w-full ${isDelete || isError ? 'bg-red-500' : 'bg-[#D4AF37]'}`}></div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {isDelete || isError ? (
              <div className="p-2 bg-red-100 rounded-full text-red-500"><AlertTriangle size={24} /></div>
            ) : (
              <div className="p-2 bg-[#FFFAF0] rounded-full text-[#D4AF37]"><Save size={24} /></div>
            )}
            <h3 className="text-xl font-serif font-bold text-[#3E2723]">{title}</h3>
          </div>
          <p className="text-gray-600 mb-8 leading-relaxed text-sm">{message}</p>
          <div className="flex justify-end gap-3">
            {!isError && (
              <button 
                onClick={onClose} 
                className="px-5 py-2.5 text-gray-500 font-medium hover:bg-gray-50 rounded-lg transition-colors text-sm"
              >
                Cancelar
              </button>
            )}
            <button 
              onClick={() => { if (onConfirm) onConfirm(); onClose(); }} 
              className={`px-5 py-2.5 font-bold rounded-lg text-white shadow-lg transform active:scale-95 transition-all text-sm flex items-center gap-2
                ${isDelete || isError ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' : 'bg-[#3E2723] hover:bg-[#5D4037] shadow-[#3E2723]/30'}`}
            >
              {confirmText || (isDelete ? 'Sí, Eliminar' : (isError ? 'Entendido' : 'Confirmar'))}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Admin Panel Component ---
export default function AdminPanel({ products, categories }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Form States
  const [productForm, setProductForm] = useState({ id: null, name: '', price: '', category: categories[1]?.name || '', image: '', description: '' });
  const [newCategory, setNewCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Modal State
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', type: 'info', onConfirm: () => {} });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      console.error("Error de autenticación:", error);
      setModalConfig({
        isOpen: true,
        title: 'Acceso Denegado',
        message: 'Usuario o contraseña incorrectos. Por favor verifica tus credenciales.',
        type: 'error',
        onConfirm: () => {}
      });
    }
  };

  const resetForm = () => {
    setProductForm({ id: null, name: '', price: '', category: '', image: '', description: '' });
    setPreviewImage('');
    setImageFile(null);
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.upload_preset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const invalidateCache = () => {
    localStorage.removeItem('chocco_data');
  };

  const initiateSave = (e) => {
    e.preventDefault();
    
    if (Number(productForm.price) < 0) {
      alert("El precio no puede ser negativo");
      return;
    }

    setModalConfig({
      isOpen: true,
      title: isEditing ? '¿Actualizar Producto?' : '¿Guardar Producto?',
      message: isEditing 
        ? `Estás a punto de modificar los datos de "${productForm.name}". ¿Deseas continuar?`
        : `Estás a punto de agregar "${productForm.name}" al catálogo. ¿Confirmar?`,
      type: 'save',
      onConfirm: executeSave
    });
  };

  const executeSave = async () => {
    setIsSaving(true);
    try {
      let imageUrl = productForm.image;

      if (imageFile) {
        const uploadedUrl = await uploadImageToCloudinary(imageFile);
        if (!uploadedUrl) {
          alert("Error al subir la imagen.");
          setIsSaving(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      if (isEditing) {
        // Actualizar en Firebase
        const productRef = doc(db, "products", String(productForm.id));
        await updateDoc(productRef, {
          name: productForm.name,
          price: Number(productForm.price),
          category: productForm.category,
          image: imageUrl,
          description: productForm.description
        });
      } else {
        // Crear en Firebase
        await addDoc(collection(db, "products"), {
          name: productForm.name,
          price: Number(productForm.price),
          category: productForm.category,
          image: imageUrl,
          description: productForm.description,
          rating: 5
        });
      }
      invalidateCache();
      resetForm();
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un error al guardar en la base de datos.");
    } finally {
      setIsSaving(false);
    }
  };

  const initiateDelete = (id, name) => {
    setModalConfig({
      isOpen: true,
      title: '¿Eliminar Producto?',
      message: `Se eliminará permanentemente "${name}" del catálogo. Esta acción no se puede deshacer.`,
      type: 'delete',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, "products", String(id)));
          invalidateCache();
        } catch (error) {
          console.error("Error al eliminar:", error);
          alert("Error al eliminar el producto.");
        }
      }
    });
  };

  const initiateEdit = (product) => {
    setProductForm(product);
    setPreviewImage(product.image);
    setImageFile(null);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const catName = newCategory.trim();
    if (!catName) return;

    if (editingCategory) {
        try {
            await updateDoc(doc(db, "categories", editingCategory.id), { name: catName });
            invalidateCache();
            setNewCategory('');
            setEditingCategory(null);
        } catch (error) {
            console.error("Error al actualizar categoría:", error);
        }
    } else {
        if (!categories.some(c => c.name === catName)) {
            try {
                await addDoc(collection(db, "categories"), { name: catName });
                invalidateCache();
                setNewCategory('');
            } catch (error) {
                console.error("Error al crear categoría:", error);
            }
        }
    }
  };

  const handleEditCategory = (cat) => {
      setNewCategory(cat.name);
      setEditingCategory(cat);
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("¿Eliminar esta categoría?")) {
        try {
            await deleteDoc(doc(db, "categories", id));
            invalidateCache();
            if (editingCategory && editingCategory.id === id) {
                setNewCategory('');
                setEditingCategory(null);
            }
        } catch (error) {
            console.error("Error al eliminar categoría:", error);
        }
    }
  };

  // Función para migrar datos iniciales si la DB está vacía
  const handleImportData = async () => {
    if (!window.confirm("¿Seguro que quieres importar los productos de ejemplo a la base de datos?")) return;
    setIsSaving(true);
    try {
      // Importar Categorías
      for (const cat of CATEGORIES.filter(c => c !== "Todos")) {
        await addDoc(collection(db, "categories"), { name: cat });
      }
      // Importar Productos
      for (const prod of PRODUCTS) {
        // Eliminamos el ID numérico para que Firebase genere uno nuevo
        const { id, ...data } = prod;
        await addDoc(collection(db, "products"), data);
      }
      invalidateCache();
      alert("¡Importación completada! Recarga la página para ver los cambios.");
    } catch (error) {
      console.error("Error importando:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <ConfirmationModal {...modalConfig} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />

      {!isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFAF0]">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#D4AF37]/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-[#3E2723]">Admin Panel</h2>
              <p className="text-gray-500 text-sm mt-2">Acceso exclusivo para Chocco Lovers</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                <input type="email" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" placeholder="admin@choccolovers.com" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Contraseña</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" />
              </div>
              <button type="submit" className="w-full bg-[#3E2723] text-white font-bold py-4 rounded-lg hover:bg-[#D4AF37] transition-colors">INGRESAR</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50">
          {/* Admin Header */}
          <header className="bg-[#3E2723] text-white px-8 py-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-4">
              <LayoutDashboard className="text-[#D4AF37]" />
              <span className="font-serif font-bold text-xl">Panel de Control</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="/" className="text-sm hover:text-[#D4AF37] transition-colors">Ver Sitio Web</a>
              <button onClick={() => signOut(auth)} className="flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-red-500/80 transition-colors">
                <LogOut size={16} /> Salir
              </button>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sidebar / Forms */}
            <div className="lg:col-span-1 space-y-8">
              {/* Add Product Form */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[#3E2723] flex items-center gap-2">
                    {isEditing ? <Edit size={20} /> : <Plus size={20} />} 
                    {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
                  </h3>
                  {isEditing && (
                    <button onClick={resetForm} className="text-xs text-red-500 hover:underline">Cancelar Edición</button>
                  )}
                </div>
                
                <form onSubmit={initiateSave} className="space-y-4">
                  <input required placeholder="Nombre del producto" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-[#D4AF37]/20" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="number" min="0" placeholder="Precio" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-[#D4AF37]/20" />
                    <select required value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-[#D4AF37]/20">
                      <option value="">Seleccionar categoría...</option>
                      {categories.filter(c => c.name !== 'Todos').map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>

                  {/* Image Upload */}
                  <div className="relative">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                    <label htmlFor="image-upload" className="w-full p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 hover:border-[#D4AF37] cursor-pointer flex flex-col items-center justify-center transition-colors">
                      {previewImage ? (
                        <img src={previewImage} alt="Preview" className="h-32 w-full object-cover rounded-md" />
                      ) : (
                        <div className="py-4 flex flex-col items-center text-gray-400">
                          <Upload size={24} className="mb-2" />
                          <span className="text-xs uppercase font-bold">Subir Imagen</span>
                        </div>
                      )}
                    </label>
                    {previewImage && <button type="button" onClick={() => {setPreviewImage(''); setProductForm({...productForm, image: ''}); setImageFile(null);}} className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md text-red-500"><X size={14}/></button>}
                  </div>

                  <textarea required placeholder="Descripción" value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-[#D4AF37]/20 h-24"></textarea>
                  
                  <button type="submit" disabled={isSaving} className="w-full bg-[#D4AF37] text-[#3E2723] font-bold py-3 rounded-lg hover:bg-[#b89628] transition-colors flex justify-center items-center gap-2 disabled:opacity-50">
                    <Save size={18} /> {isSaving ? 'Guardando...' : (isEditing ? 'Actualizar Producto' : 'Guardar Producto')}
                  </button>
                </form>
              </div>

              {/* Add Category Form */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#3E2723] mb-6 flex items-center gap-2"><Package size={20} /> {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
                <form onSubmit={handleAddCategory} className="flex gap-2">
                  <input required placeholder="Nombre categoría" value={newCategory} onChange={e => setNewCategory(e.target.value)} className="flex-1 p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-[#D4AF37]/20" />
                  <button type="submit" className="bg-[#3E2723] text-white p-3 rounded-lg hover:bg-black transition-colors">
                      {editingCategory ? <Save size={20} /> : <Plus size={20} />}
                  </button>
                  {editingCategory && (
                      <button type="button" onClick={() => { setNewCategory(''); setEditingCategory(null); }} className="bg-gray-200 text-gray-600 p-3 rounded-lg hover:bg-gray-300 transition-colors">
                          <X size={20} />
                      </button>
                  )}
                </form>
                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.filter(c => c.name !== 'Todos').map(c => (
                    <div key={c.id} className="flex items-center gap-1 bg-gray-100 pl-3 pr-1 py-1 rounded-full text-gray-600 text-xs">
                        <span>{c.name}</span>
                        <button onClick={() => handleEditCategory(c)} className="p-1 hover:text-[#D4AF37]"><Edit size={12} /></button>
                        <button onClick={() => handleDeleteCategory(c.id)} className="p-1 hover:text-red-500"><X size={12} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product List */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[#3E2723]">Inventario ({products.length})</h3>
                  {products.length === 0 && (
                    <button onClick={handleImportData} disabled={isSaving} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 flex items-center gap-1">
                      <Database size={12} /> Importar Datos de Ejemplo
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  {products.map(product => (
                    <div key={product.id} className={`flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-all bg-white ${isEditing && productForm.id === product.id ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]' : 'border-gray-100'}`}>
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md bg-gray-100" />
                      <div className="flex-1">
                        <h4 className="font-bold text-[#3E2723]">{product.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="text-[#D4AF37] font-bold">${product.price.toLocaleString()}</span>
                          <span>•</span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{product.category}</span>
                        </div>
                      </div>
                      <button onClick={() => initiateEdit(product)} className="p-2 text-gray-400 hover:text-[#D4AF37] hover:bg-[#FFFAF0] rounded-full transition-all" title="Editar">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => initiateDelete(product.id, product.name)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all" title="Eliminar">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};