import { useState, useEffect } from 'react';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const useProducts = (isAdminRoute) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', name: 'Todos' }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ESTRATEGIA HÍBRIDA:
    // 1. Si es ADMIN: Usamos onSnapshot (Tiempo Real) para gestión inmediata.
    // 2. Si es PÚBLICO: Usamos getDocs + LocalStorage (Caché) para ahorrar lecturas.

    if (isAdminRoute) {
      let categoriesLoaded = false;
      let productsLoaded = false;

      const checkLoading = () => {
        if (categoriesLoaded && productsLoaded) setLoading(false);
      };

      const unsubscribeCategories = onSnapshot(collection(db, "categories"), (snapshot) => {
        const catList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories([{ id: 'all', name: 'Todos' }, ...catList]);
        categoriesLoaded = true;
        checkLoading();
      }, (error) => {
        console.log("Error cargando categorías:", error);
        categoriesLoaded = true;
        checkLoading();
      });

      const unsubscribeProducts = onSnapshot(collection(db, "products"), (snapshot) => {
        const prodList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(prodList);
        productsLoaded = true;
        checkLoading();
      }, (error) => {
        console.log("Error cargando productos:", error);
        productsLoaded = true;
        checkLoading();
      });

      return () => {
        unsubscribeCategories();
        unsubscribeProducts();
      };
    } else {
      const fetchPublicData = async () => {
        const CACHE_KEY = 'chocco_data';
        const CACHE_DURATION = 15 * 60 * 1000; // 15 Minutos
        const cached = localStorage.getItem(CACHE_KEY);
        const now = Date.now();

        if (cached) {
          const { products, categories, timestamp } = JSON.parse(cached);
          if (now - timestamp < CACHE_DURATION) {
            setProducts(products);
            setCategories(categories);
            setLoading(false);
            return;
          }
        }

        try {
          const [catSnap, prodSnap] = await Promise.all([
            getDocs(collection(db, "categories")),
            getDocs(collection(db, "products"))
          ]);

          const catList = catSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          const prodList = prodSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          const finalCats = [{ id: 'all', name: 'Todos' }, ...catList];

          setCategories(finalCats);
          setProducts(prodList);
          setLoading(false);

          localStorage.setItem(CACHE_KEY, JSON.stringify({
            products: prodList,
            categories: finalCats,
            timestamp: now
          }));
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };

      fetchPublicData();
    }
  }, [isAdminRoute]);

  return { products, categories, loading };
};