"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number | null;
  image: string;
  description: string;
  sizes: string;
};

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
    description: "",
    sizes: "S,M,L,XL",
  });

  // 🔥 GET PRODUCTS
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
      alert("Erreur chargement ❌");
      return;
    }

    setProducts(data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 ADD PRODUCT
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Remplis les champs importants ⚠️");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("products").insert([
      {
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: newProduct.stock ? Number(newProduct.stock) : null,
        image: newProduct.image,
        description: newProduct.description,
        sizes: newProduct.sizes,
      },
    ]);

    setLoading(false);

    if (error) {
      console.log(error);
      alert("Erreur❌: " + error.message);
      return;
    }

    alert("Produit ajouté ✅");

    setNewProduct({
      name: "",
      price: "",
      stock: "",
      image: "",
      description: "",
      sizes: "S,M,L,XL",
    });

    fetchProducts();
  };

  // 🔥 DELETE
  const deleteProduct = async (id: number) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.log(error);
      alert("Erreur suppression ❌");
      return;
    }

    fetchProducts();
  };

  // 🔥 UPDATE
  const updateProduct = async (
    id: number,
    field: keyof Product,
    value: string | number | null
  ) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );

    const { error } = await supabase
      .from("products")
      .update({ [field]: value })
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Erreur modification ❌");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Admin Dashboard
      </h1>

      {/* ADD PRODUCT */}
      <div className="bg-white text-black p-6 rounded-3xl max-w-xl mx-auto mb-10 shadow-xl">
        <h2 className="text-2xl font-bold mb-5">Ajouter produit</h2>

        <div className="grid gap-4">
          <input
            placeholder="Nom du produit"
            className="border p-3 rounded-xl"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />

          <input
            placeholder="Prix"
            type="number"
            className="border p-3 rounded-xl"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />

          <input
            placeholder="Stock"
            type="number"
            className="border p-3 rounded-xl"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
          />

          <input
            placeholder="Description"
            className="border p-3 rounded-xl"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                description: e.target.value,
              })
            }
          />

          <input
  type="file"
  className="border p-3 rounded-xl"
  onChange={async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) {
      alert("Erreur upload ❌");
      console.log(error);
      return;
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    setNewProduct({
      ...newProduct,
      image: data.publicUrl,
    });

    alert("Image uploadée ✅");
  }}
/>

          <button
            onClick={addProduct}
            disabled={loading}
            className="bg-black text-white py-3 rounded-xl font-bold"
          >
            {loading ? "Ajout..." : "Ajouter"}
          </button>
        </div>
      </div>

      {/* PRODUCTS LIST */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white text-black rounded-3xl p-5 shadow-xl"
          >
            <div className="h-56 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden mb-5">
              <img
                src={product.image}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="grid gap-3">
              <input
                value={product.name}
                className="border p-3 rounded-xl font-bold"
                onChange={(e) =>
                  updateProduct(product.id, "name", e.target.value)
                }
              />

              <input
                type="number"
                value={product.price}
                className="border p-3 rounded-xl"
                onChange={(e) =>
                  updateProduct(product.id, "price", Number(e.target.value))
                }
              />

              <input
                type="number"
                value={product.stock ?? ""}
                className="border p-3 rounded-xl"
                onChange={(e) =>
                  updateProduct(
                    product.id,
                    "stock",
                    e.target.value ? Number(e.target.value) : null
                  )
                }
              />

              <input
                value={product.image}
                className="border p-3 rounded-xl"
                onChange={(e) =>
                  updateProduct(product.id, "image", e.target.value)
                }
              />

              <input
                value={product.description || ""}
                className="border p-3 rounded-xl"
                onChange={(e) =>
                  updateProduct(product.id, "description", e.target.value)
                }
              />

              <input
                value={product.sizes || ""}
                className="border p-3 rounded-xl"
                onChange={(e) =>
                  updateProduct(product.id, "sizes", e.target.value)
                }
              />

              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 text-white py-3 rounded-xl font-bold"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}