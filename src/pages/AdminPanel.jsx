import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, Plus, Save, LogOut, LayoutDashboard, Package, Edit, Upload, AlertTriangle, Database, X, Star, PackageX, Users, Heart, Search, ArrowUpDown, ChevronDown, ChevronUp, Check, AlertCircle, Info, CircleAlert } from 'lucide-react';
import { db, auth } from '../config/firebaseConfig';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

// --- VALIDATION ERROR MODAL ---
const ValidationErrorModal = ({ isOpen, errors, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden transform transition-all scale-100">
        <div className="h-2 w-full bg-red-500"></div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-full text-red-500">
              <CircleAlert size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#3E2723]">Campos Requeridos</h3>
          </div>
          <ul className="mb-6 space-y-2">
            {errors.map((error, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                <X size={14} className="text-red-500" />
                {error}
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <button 
              onClick={onClose} 
              className="px-5 py-2.5 bg-[#3E2723] text-white font-bold rounded-lg hover:bg-[#5D4037] transition-colors text-sm"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// --- TOAST NOTIFICATION COMPONENT ---
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = { success: <Check size={18} />, error: <AlertCircle size={18} />, info: <Info size={18} /> };
  const colors = { success: 'bg-green-500', error: 'bg-red-500', info: 'bg-[#D4AF37]' };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className={`${colors[type]} text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3`}>
        {icons[type]}
        <span className="font-medium text-sm">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-80"><X size={16} /></button>
      </div>
    </div>
  );
};

// --- SKELETON LOADER COMPONENT ---
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

const ProductSkeleton = () => (
  <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
    <Skeleton className="w-16 h-16 rounded-md" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4 rounded" />
      <Skeleton className="h-3 w-1/2 rounded" />
    </div>
    <Skeleton className="w-8 h-8 rounded-full" />
    <Skeleton className="w-8 h-8 rounded-full" />
  </div>
);

// --- CUSTOM CONFIRMATION MODAL ---
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

// --- Admin Panel Component ---
export default function AdminPanel({ products, categories, loading }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Form States
  const [productForm, setProductForm] = useState({ id: null, name: '', price: '', category: categories[1]?.name || '', images: [], description: '', isFeatured: false, inStock: true });
  const [newCategory, setNewCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [imageFiles, setImageFiles] = useState([]); // Array de archivos File
  const [previewImages, setPreviewImages] = useState([]); // Array de URLs locales
  const [isSaving, setIsSaving] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [inventoryFilter, setInventoryFilter] = useState('Todos');

  // Client Moments States
  const [clientMoments, setClientMoments] = useState([]);
  const [clientImageFile, setClientImageFile] = useState(null);
  const [clientPreview, setClientPreview] = useState('');
  const [isSavingClient, setIsSavingClient] = useState(false);

  // Modal State
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', type: 'info', onConfirm: () => {} });
  const [validationErrors, setValidationErrors] = useState({ isOpen: false, errors: [] });

  // Toast State
  const [toasts, setToasts] = useState([]);

  // Search & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Form Tabs State
  const [formTab, setFormTab] = useState('details');

  // Navigation & Collapsible State
  const [activeSection, setActiveSection] = useState(null);
  const [productsExpanded, setProductsExpanded] = useState(true);
  const [clientsExpanded, setClientsExpanded] = useState(true);
  const [formsExpanded, setFormsExpanded] = useState(true);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "client_moments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setClientMoments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
    setProductForm({ id: null, name: '', price: '', category: '', images: [], description: '', isFeatured: false, inStock: true });
    setPreviewImages([]);
    setImageFiles([]);
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      const newImages = [...productForm.images];
      newImages.splice(index, 1);
      setProductForm({ ...productForm, images: newImages });
    } else {
      const newFiles = [...imageFiles];
      const newPreviews = [...previewImages];
      newFiles.splice(index, 1);
      newPreviews.splice(index, 1);
      setImageFiles(newFiles);
      setPreviewImages(newPreviews);
    }
  };

  const uploadImages = async () => {
    try {
      const uploadPromises = imageFiles.map(file => uploadImageToCloudinary(file));
      const urls = await Promise.all(uploadPromises);
      return urls.filter(url => url !== null);
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
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
    } catch {
      return null;
    }
  };

  const handleClientSave = async (e) => {
    e.preventDefault();
    if (!clientImageFile) return;

    setIsSavingClient(true);
    try {
      const url = await uploadImageToCloudinary(clientImageFile);
      if (url) {
        await addDoc(collection(db, "client_moments"), {
          url,
          createdAt: serverTimestamp()
        });
        setClientImageFile(null);
        setClientPreview('');
        invalidateCache();
      }
    } catch (error) {
      console.error("Error saving client moment:", error);
    } finally {
      setIsSavingClient(false);
    }
  };

  const initiateClientDelete = (id) => {
    setModalConfig({
      isOpen: true,
      title: '¿Eliminar Foto?',
      message: 'Se eliminará esta imagen de la sección de clientes permanentemente.',
      type: 'delete',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, "client_moments", id));
          invalidateCache();
        } catch (error) {
          console.error("Error deleting client moment:", error);
        }
      }
    });
  };

  const invalidateCache = () => {
    localStorage.removeItem('chocco_data');
    localStorage.removeItem('chocco_clients_cache');
  };

  const initiateSave = (e) => {
    e.preventDefault();
    
    // Validaciones de campos requeridos
    const errors = [];
    if (!productForm.name || productForm.name.trim() === '') {
      errors.push('El nombre del producto es requerido');
    }
    if (!productForm.price || Number(productForm.price) <= 0) {
      errors.push('El precio debe ser mayor a 0');
    }
    if (!productForm.category) {
      errors.push('Debes seleccionar una categoría');
    }
    if (!productForm.description || productForm.description.trim() === '') {
      errors.push('La descripción es requerida');
    }

    if (errors.length > 0) {
      setValidationErrors({ isOpen: true, errors });
      return;
    }

    // Validar límite de destacados
    const featuredCount = products.filter(p => p.isFeatured && p.id !== productForm.id).length;
    if (productForm.isFeatured && featuredCount >= 3) {
      setModalConfig({
        isOpen: true,
        title: 'Límite de Destacados',
        message: 'Solo puedes tener hasta 3 productos destacados simultáneamente para mantener la exclusividad.',
        type: 'error'
      });
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
      const newUploadedUrls = await uploadImages();
      // Combinamos imágenes existentes (si estamos editando) con las nuevas subidas
      const finalImages = [...(productForm.images || []), ...newUploadedUrls];
      const mainImage = finalImages[0] || ''; // Mantenemos compatibilidad con campo 'image'

      if (isEditing) {
        // Actualizar en Firebase
        const productRef = doc(db, "products", String(productForm.id));
        await updateDoc(productRef, {
          name: productForm.name,
          price: Number(productForm.price),
          category: productForm.category,
          image: mainImage,
          images: finalImages || [],
          description: productForm.description,
          isFeatured: !!productForm.isFeatured,
          inStock: productForm.inStock !== undefined ? productForm.inStock : true
        });
      } else {
        // Crear en Firebase
        await addDoc(collection(db, "products"), {
          name: productForm.name,
          price: Number(productForm.price),
          category: productForm.category,
          image: mainImage,
          images: finalImages,
          description: productForm.description,
          rating: 5,
          isFeatured: !!productForm.isFeatured,
          inStock: productForm.inStock !== undefined ? productForm.inStock : true
        });
      }
      invalidateCache();
      resetForm();
      addToast(isEditing ? 'Producto actualizado correctamente' : 'Producto creado correctamente', 'success');
    } catch (error) {
      console.error("Error al guardar:", error);
      addToast('Hubo un error al guardar en la base de datos', 'error');
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
          addToast('Producto eliminado correctamente', 'success');
        } catch (error) {
          console.error("Error al eliminar:", error);
          addToast('Error al eliminar el producto', 'error');
        }
      }
    });
  };

  const initiateEdit = (product) => {
    // Senior Tip: Siempre mergear con valores por defecto para evitar 'undefined' en campos nuevos
    setProductForm({
      ...product,
      images: product.images || [],
      isFeatured: !!product.isFeatured,
      inStock: product.inStock !== undefined ? product.inStock : true,
      description: product.description || ''
    });
    setPreviewImages([]);
    setImageFiles([]);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredInventory = useMemo(() => {
    let result = inventoryFilter === 'Todos' 
      ? products 
      : products.filter(p => p.category === inventoryFilter);

    // Búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description?.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Ordenamiento
    result = [...result].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'stock':
          comparison = (a.inStock === false ? 1 : 0) - (b.inStock === false ? 1 : 0);
          break;
        case 'featured':
          comparison = (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [products, inventoryFilter, searchQuery, sortBy, sortOrder]);

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
            addToast('Categoría actualizada correctamente', 'success');
        } catch (error) {
            console.error("Error al actualizar categoría:", error);
            addToast('Error al actualizar la categoría', 'error');
        }
    } else {
        if (!categories.some(c => c.name === catName)) {
            try {
                await addDoc(collection(db, "categories"), { name: catName });
                invalidateCache();
                setNewCategory('');
                addToast('Categoría creada correctamente', 'success');
            } catch (error) {
                console.error("Error al crear categoría:", error);
                addToast('Error al crear la categoría', 'error');
            }
        } else {
            addToast('La categoría ya existe', 'error');
        }
    }
  };

  const toggleFeaturedCategory = async (category) => {
    const featuredCount = categories.filter(c => c.isFeatured).length;
    
    if (!category.isFeatured && featuredCount >= 2) {
      setModalConfig({
        isOpen: true,
        title: 'Límite de Categorías',
        message: 'Solo puedes destacar hasta 2 categorías para mantener el enfoque visual.',
        type: 'error',
        confirmText: 'Entendido'
      });
      return;
    }

    try {
      await updateDoc(doc(db, "categories", category.id), {
        isFeatured: !category.isFeatured
      });
      invalidateCache();
      addToast(category.isFeatured ? 'Categoría desmarcada como destacada' : 'Categoría destacada correctamente', 'success');
    } catch (error) {
      console.error("Error al destacar categoría:", error);
      addToast('Error al destacar la categoría', 'error');
    }
  };

  const handleEditCategory = (cat) => {
      setNewCategory(cat.name);
      setEditingCategory(cat);
  };

  const handleDeleteCategory = async (id) => {
    setModalConfig({
      isOpen: true,
      title: '¿Eliminar Categoría?',
      message: 'Se eliminará esta categoría del sistema. Los productos no se eliminarán pero quedará sin categoría.',
      type: 'delete',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, "categories", id));
          invalidateCache();
          addToast('Categoría eliminada correctamente', 'success');
          if (editingCategory && editingCategory.id === id) {
            setNewCategory('');
            setEditingCategory(null);
          }
        } catch (error) {
          console.error("Error al eliminar categoría:", error);
          addToast('Error al eliminar la categoría', 'error');
        }
      }
    });
  };

  // Función para migrar datos iniciales si la DB está vacía
  const handleImportData = async () => {
    setModalConfig({
      isOpen: true,
      title: '¿Importar Datos?',
      message: 'Se importarán los productos de ejemplo a la base de datos. ¿Continuar?',
      type: 'save',
      onConfirm: async () => {
        setIsSaving(true);
        try {
          for (const cat of CATEGORIES.filter(c => c !== "Todos")) {
            await addDoc(collection(db, "categories"), { name: cat });
          }
          for (const prod of PRODUCTS) {
            const { id: _id, ...data } = prod;
            await addDoc(collection(db, "products"), { ...data, inStock: true });
          }
          const exampleMoments = [
            { url: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=400' },
            { url: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80&w=400' }
          ];
          for (const m of exampleMoments) {
            await addDoc(collection(db, "client_moments"), { ...m, createdAt: serverTimestamp() });
          }
          invalidateCache();
          addToast('¡Importación completada! Recarga la página para ver los cambios.', 'success');
        } catch (error) {
          console.error("Error importando:", error);
          addToast('Error al importar datos', 'error');
        } finally {
          setIsSaving(false);
        }
      }
    });
  };

  return (
    <>
      <ConfirmationModal {...modalConfig} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} />
      <ValidationErrorModal 
        isOpen={validationErrors.isOpen} 
        errors={validationErrors.errors} 
        onClose={() => setValidationErrors({ isOpen: false, errors: [] })} 
      />
      
      {/* Toast Notifications */}
      {toasts.map(toast => (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
      ))}

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
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
          {/* Admin Header */}
          <header className="bg-[#3E2723] text-white px-4 sm:px-8 py-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3 sm:gap-4">
              <LayoutDashboard className="text-[#D4AF37] w-5 h-5" />
              <span className="font-serif font-bold text-lg sm:text-xl">Panel de Control</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
              <a href="/" className="text-xs sm:text-sm hover:text-[#D4AF37] transition-colors hidden sm:block">Ver Sitio Web</a>
              <button onClick={() => signOut(auth)} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm bg-white/10 px-2 sm:px-4 py-2 rounded-full hover:bg-red-500/80 transition-colors">
                <LogOut size={14} /> <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </header>

          {/* Mobile Navigation Tabs */}
          <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveSection('products')}
                className={`flex-1 min-w-[80px] px-3 py-3 text-xs font-medium text-center whitespace-nowrap transition-colors ${activeSection === 'products' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] bg-[#FFFAF0]/50' : 'text-gray-500'}`}
              >
                <Package size={16} className="mx-auto mb-1" />
                Productos
              </button>
              <button
                onClick={() => setActiveSection('clients')}
                className={`flex-1 min-w-[80px] px-3 py-3 text-xs font-medium text-center whitespace-nowrap transition-colors ${activeSection === 'clients' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] bg-[#FFFAF0]/50' : 'text-gray-500'}`}
              >
                <Users size={16} className="mx-auto mb-1" />
                Clientes
              </button>
              <button
                onClick={() => setActiveSection('forms')}
                className={`flex-1 min-w-[80px] px-3 py-3 text-xs font-medium text-center whitespace-nowrap transition-colors ${activeSection === 'forms' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] bg-[#FFFAF0]/50' : 'text-gray-500'}`}
              >
                <Plus size={16} className="mx-auto mb-1" />
                Agregar
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-6 lg:py-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Product List - 2/3 del espacio */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* Sección Productos (collapsible) */}
              <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${activeSection && activeSection !== 'products' ? 'hidden lg:block' : ''}`}>
                <button 
                  onClick={() => {
                    setProductsExpanded(!productsExpanded);
                    if (activeSection) setActiveSection(null);
                  }}
                  className="w-full p-4 sm:p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Package size={20} className="text-[#D4AF37]" />
                    <h3 className="font-bold text-[#3E2723]">Inventario ({filteredInventory.length})</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 lg:hidden">{productsExpanded ? 'Ocultar' : 'Ver'}</span>
                    {productsExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </div>
                </button>
                
                {productsExpanded && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    {/* Filtros */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <div className="relative flex-1 min-w-[140px]">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Buscar..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-gray-50"
                        />
                      </div>
                      <select
                        value={`${sortBy}-${sortOrder}`}
                        onChange={(e) => {
                          const [by, order] = e.target.value.split('-');
                          setSortBy(by);
                          setSortOrder(order);
                        }}
                        className="text-xs p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-gray-50"
                      >
                        <option value="name-asc">Nombre A-Z</option>
                        <option value="name-desc">Nombre Z-A</option>
                        <option value="price-asc">Precio ↑</option>
                        <option value="price-desc">Precio ↓</option>
                        <option value="stock-desc">Con Stock</option>
                        <option value="featured-desc">Destacados</option>
                      </select>
                      <select 
                        value={inventoryFilter} 
                        onChange={(e) => setInventoryFilter(e.target.value)}
                        className="text-xs p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] bg-gray-50"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Empty State */}
                    {products.length === 0 ? (
                      <div className="text-center py-8">
                        <Package size={40} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-sm text-gray-400 mb-3">No hay productos</p>
                        <button onClick={handleImportData} disabled={isSaving} className="text-sm bg-[#D4AF37] text-[#3E2723] px-4 py-2 rounded-lg font-medium hover:bg-[#b89628] transition-colors">
                          <Database size={14} className="inline mr-1" /> Importar Datos
                        </button>
                      </div>
                    ) : filteredInventory.length === 0 ? (
                      <div className="text-center py-8">
                        <Search size={40} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-sm text-gray-400">Sin resultados</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[50vh] lg:max-h-none overflow-y-auto lg:overflow-visible">
                        {loading ? (
                          Array.from({ length: 3 }).map((_, i) => <ProductSkeleton key={i} />)
                        ) : (
                          filteredInventory.slice(0, productsExpanded ? undefined : 5).map(product => (
                            <div key={product.id} className={`flex items-center gap-3 p-3 border rounded-lg hover:shadow-md transition-all bg-white ${isEditing && productForm.id === product.id ? 'border-[#D4AF37]' : 'border-gray-100'}`}>
                              <img src={product.image} alt={product.name} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md bg-gray-100" />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-[#3E2723] text-sm sm:text-base truncate">{product.name}</h4>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <span className="text-[#D4AF37] font-bold">${product.price.toLocaleString()}</span>
                                  <span className="bg-gray-100 px-2 py-0.5 rounded">{product.category}</span>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <button onClick={() => initiateEdit(product)} className="p-2 text-gray-400 hover:text-[#D4AF37] hover:bg-[#FFFAF0] rounded-full" title="Editar">
                                  <Edit size={16} />
                                </button>
                                <button onClick={() => initiateDelete(product.id, product.name)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full" title="Eliminar">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {/* Show More/Less Button */}
                    {filteredInventory.length > 5 && (
                      <button 
                        onClick={() => setProductsExpanded(!productsExpanded)}
                        className="w-full mt-4 py-2 text-sm text-[#D4AF37] font-medium hover:bg-[#FFFAF0] rounded-lg transition-colors"
                      >
                        {productsExpanded ? 'Ver menos' : `Ver todos (${filteredInventory.length})`}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Sección Clientes (collapsible) */}
              <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${activeSection && activeSection !== 'clients' ? 'hidden lg:block' : ''}`}>
                <button 
                  onClick={() => {
                    setClientsExpanded(!clientsExpanded);
                    if (activeSection) setActiveSection(null);
                  }}
                  className="w-full p-4 sm:p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Users size={20} className="text-[#D4AF37]" />
                    <h3 className="font-bold text-[#3E2723]">Fotos de Clientes ({clientMoments.length})</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 lg:hidden">{clientsExpanded ? 'Ocultar' : 'Ver'}</span>
                    {clientsExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </div>
                </button>
                
                {clientsExpanded && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    {clientMoments.length === 0 ? (
                      <div className="text-center py-8">
                        <Users size={32} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-sm text-gray-400">No hay fotos de clientes aún</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[40vh] overflow-y-auto">
                        {clientMoments.map(moment => (
                          <div key={moment.id} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                            <img src={moment.url} alt="Cliente" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button onClick={() => initiateClientDelete(moment.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar / Forms - 1/3 del espacio */}
            <div className="lg:col-span-1 space-y-4 lg:space-y-6">
              {/* Formularios (collapsible) */}
              <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${activeSection && activeSection !== 'forms' ? 'hidden lg:block' : ''}`}>
                <button 
                  onClick={() => {
                    setFormsExpanded(!formsExpanded);
                    if (activeSection) setActiveSection(null);
                  }}
                  className="w-full p-4 sm:p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Plus size={20} className="text-[#D4AF37]" />
                    <h3 className="font-bold text-[#3E2723]">Formularios</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 lg:hidden">{formsExpanded ? 'Ocultar' : 'Ver'}</span>
                    {formsExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </div>
                </button>
                
                {formsExpanded && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-6">
                
                {/* Form Tabs */}
                <div className="flex border-b border-gray-200 mb-4">
                  <button
                    onClick={() => setFormTab('details')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${formTab === 'details' ? 'border-[#D4AF37] text-[#3E2723]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                  >
                    Datos
                  </button>
                  <button
                    onClick={() => setFormTab('images')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${formTab === 'images' ? 'border-[#D4AF37] text-[#3E2723]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                  >
                    Imágenes
                  </button>
                  <button
                    onClick={() => setFormTab('config')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${formTab === 'config' ? 'border-[#D4AF37] text-[#3E2723]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                  >
                    Config
                  </button>
                </div>

                <form onSubmit={initiateSave}>
                  {/* Tab: Details */}
                  {formTab === 'details' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nombre del producto</label>
                        <input placeholder="Ej: Bombonera Clásica" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Precio</label>
                          <input type="number" min="0" placeholder="0" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Categoría</label>
                          <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20">
                            <option value="">Seleccionar...</option>
                            {categories.filter(c => c.name !== 'Todos').map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Descripción</label>
                        <textarea placeholder="Descripción del producto..." value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 h-24 resize-none"></textarea>
                      </div>
                    </div>
                  )}

                  {/* Tab: Images */}
                  {formTab === 'images' && (
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Imágenes del Producto</label>
                      <div className="grid grid-cols-3 gap-2">
                        {productForm.images?.map((img, idx) => (
                          <div key={`existing-${idx}`} className="relative group aspect-square">
                            <img src={img} alt="Product" className="w-full h-full object-cover rounded-lg border border-gray-200" />
                            <button type="button" onClick={() => removeImage(idx, true)} className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                        {previewImages.map((url, idx) => (
                          <div key={`new-${idx}`} className="relative group aspect-square">
                            <img src={url} alt="Preview" className="w-full h-full object-cover rounded-lg border-2 border-[#D4AF37]/30" />
                            <button type="button" onClick={() => removeImage(idx, false)} className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                        <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg hover:border-[#D4AF37] hover:bg-[#FFFAF0] cursor-pointer transition-all">
                          <Plus size={20} className="text-gray-400" />
                          <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Tab: Config */}
                  {formTab === 'config' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-[#FFFAF0] rounded-lg border border-[#D4AF37]/20">
                        <div className="flex items-center gap-2">
                          <Star size={18} className={productForm.isFeatured ? "text-[#D4AF37] fill-[#D4AF37]" : "text-gray-300"} />
                          <span className="text-sm font-bold text-[#3E2723]">Producto Destacado</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={productForm.isFeatured} onChange={e => setProductForm({...productForm, isFeatured: e.target.checked})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2">
                          <PackageX size={18} className={productForm.inStock ? "text-gray-300" : "text-red-500"} />
                          <span className="text-sm font-bold text-[#3E2723]">Stock Disponible</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={productForm.inStock} onChange={e => setProductForm({...productForm, inStock: e.target.checked})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                      </div>
                    </div>
                  )}

                  <button type="submit" disabled={isSaving} className="w-full bg-[#D4AF37] text-[#3E2723] font-bold py-3 rounded-lg hover:bg-[#b89628] transition-colors flex justify-center items-center gap-2 disabled:opacity-50 mt-4">
                    <Save size={18} /> {isSaving ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar')}
                  </button>
                </form>
                  </div>
                )}

                {/* Add Client Moment Form */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-[#3E2723] mb-4 flex items-center gap-2"><Heart size={18} /> Nueva Foto Cliente</h3>
                  <form onSubmit={handleClientSave} className="space-y-4">
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if(file) { setClientImageFile(file); setClientPreview(URL.createObjectURL(file)); }
                        }} 
                        className="hidden" 
                        id="client-image-upload" 
                      />
                      <label htmlFor="client-image-upload" className="w-full p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 hover:border-[#D4AF37] cursor-pointer flex flex-col items-center justify-center transition-colors min-h-[100px]">
                        {clientPreview ? (
                          <img src={clientPreview} alt="Preview" className="h-24 w-full object-cover rounded-md" />
                        ) : (
                          <div className="py-2 flex flex-col items-center text-gray-400">
                            <Upload size={20} className="mb-1" />
                            <span className="text-xs uppercase font-bold">Subir</span>
                          </div>
                        )}
                      </label>
                    </div>
                    <button type="submit" disabled={isSavingClient || !clientImageFile} className="w-full bg-[#3E2723] text-white font-bold py-2 sm:py-3 rounded-lg hover:bg-black transition-colors flex justify-center items-center gap-2 disabled:opacity-50 text-sm">
                      <Save size={16} /> {isSavingClient ? 'Subiendo...' : 'Guardar'}
                    </button>
                  </form>
                </div>

                {/* Add Category Form */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-[#3E2723] mb-4 flex items-center gap-2"><Package size={18} /> {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
                  <form onSubmit={handleAddCategory} className="flex gap-2">
                    <input required placeholder="Nueva categoría" value={newCategory} onChange={e => setNewCategory(e.target.value)} className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 text-sm" />
                    <button type="submit" className="bg-[#3E2723] text-white p-3 rounded-lg hover:bg-black transition-colors h-[46px]">
                        {editingCategory ? <Save size={18} /> : <Plus size={18} />}
                    </button>
                    {editingCategory && (
                        <button type="button" onClick={() => { setNewCategory(''); setEditingCategory(null); }} className="bg-gray-200 text-gray-600 p-3 rounded-lg hover:bg-gray-300 transition-colors h-[46px]">
                            <X size={18} />
                        </button>
                    )}
                  </form>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {categories.filter(c => c.name !== 'Todos').map(c => (
                      <div key={c.id} className="flex items-center gap-1 bg-gray-100 pl-2 pr-1 py-1 rounded-full text-gray-600 text-xs">
                          <span className="font-medium">{c.name}</span>
                          <button onClick={() => toggleFeaturedCategory(c)} className={`p-1 ${c.isFeatured ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
                            <Star size={10} fill={c.isFeatured ? "currentColor" : "none"} />
                          </button>
                          <button onClick={() => handleEditCategory(c)} className="p-0.5 hover:text-[#D4AF37]"><Edit size={10} /></button>
                          <button onClick={() => handleDeleteCategory(c.id)} className="p-0.5 hover:text-red-500"><X size={10} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
