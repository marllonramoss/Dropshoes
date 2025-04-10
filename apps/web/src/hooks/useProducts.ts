"use client";

import { useState, useEffect } from "react";
import {
  Product,
  Collection,
  getProducts,
  getProductBySlug,
  getProductsByCategory,
  getProductsByCollection,
  getFeaturedProducts,
  getDiscountedProducts,
  getCollections,
  getFeaturedCollections,
  getCollectionBySlug,
  searchProducts,
} from "@/mocks/api";

interface UseProductsReturn {
  // Produtos
  allProducts: Product[];
  featuredProducts: Product[];
  discountedProducts: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getProductsByCollection: (collectionId: string) => Product[];
  searchProducts: (query: string) => Product[];

  // Coleções
  allCollections: Collection[];
  featuredCollections: Collection[];
  getCollectionBySlug: (slug: string) => Collection | undefined;

  // Estado
  loading: boolean;
  error: Error | null;
}

/**
 * Hook para acessar produtos e coleções da loja
 */
export function useProducts(): UseProductsReturn {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [allCollections, setAllCollections] = useState<Collection[]>([]);
  const [featuredCollections, setFeaturedCollections] = useState<Collection[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Em um cenário real, faríamos requisições HTTP aqui
        // mas como é um mock, estamos apenas chamando as funções
        setLoading(true);

        // Buscar produtos
        const products = getProducts();
        setAllProducts(products);

        // Buscar produtos em destaque
        const featured = getFeaturedProducts();
        setFeaturedProducts(featured);

        // Buscar produtos com desconto
        const discounted = getDiscountedProducts();
        setDiscountedProducts(discounted);

        // Buscar coleções
        const collections = getCollections();
        setAllCollections(collections);

        // Buscar coleções em destaque
        const featuredCollections = getFeaturedCollections();
        setFeaturedCollections(featuredCollections);

        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Erro desconhecido ao buscar produtos")
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    // Produtos
    allProducts,
    featuredProducts,
    discountedProducts,
    getProductBySlug,
    getProductsByCategory,
    getProductsByCollection,
    searchProducts,

    // Coleções
    allCollections,
    featuredCollections,
    getCollectionBySlug,

    // Estado
    loading,
    error,
  };
}
