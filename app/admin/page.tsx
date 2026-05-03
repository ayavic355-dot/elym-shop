"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  sizes: string[];
};

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "ELYM T-Shirt Model 1",
      price: 50,
      stock: 10,
      image: "/images/shirt1.jpeg",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 2,
      name: "ELYM T-Shirt Model 2",
      price: 50,
      stock: 5,
      image: "/images/shirt2.jpeg",
      sizes: ["S", "M", "L", "XL"],
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
    sizes: "",
  });

  const addProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.stock ||
      !newProduct.image ||
      !newProduct.sizes
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      image: newProduct.image,
      sizes: newProduct.sizes.split(",").map((size) => size.trim()),
    };

    setProducts([...products, product]);

    setNewProduct({
      name: "",
      price: "",
      stock: "",
      image: "",
      sizes: "",
    });

    alert("Produit ajouté avec succès ✅");
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const updateProduct = (
    id: number,
    field: keyof Product,
    value: string | number | string[]
  ) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Admin Dashboard
      </h1>

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
            placeholder="Stock ex: 10"
            type="number"
            className="border p-3 rounded-xl"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
          />

          <input
            placeholder="Image ex: /images/shirt1.jpeg"
            className="border p-3 rounded-xl"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />

          <input
            placeholder="Tailles ex: S,M,L,XL"
            className="border p-3 rounded-xl"
            value={newProduct.sizes}
            onChange={(e) =>
              setNewProduct({ ...newProduct, sizes: e.target.value })
            }
          />

          <button
            onClick={addProduct}
            className="bg-black text-white py-3 rounded-xl font-bold"
          >
            Ajouter le produit
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white text-black rounded-3xl p-5 shadow-xl"
          >
            <div className="h-56 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden mb-5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="grid gap-3">
              <input
                className="border p-3 rounded-xl font-bold"
                value={product.name}
                onChange={(e) =>
                  updateProduct(product.id, "name", e.target.value)
                }
              />

              <input
                type="number"
                className="border p-3 rounded-xl"
                value={product.price}
                onChange={(e) =>
                  updateProduct(product.id, "price", Number(e.target.value))
                }
              />

              <input
                type="number"
                className="border p-3 rounded-xl"
                value={product.stock}
                onChange={(e) =>
                  updateProduct(product.id, "stock", Number(e.target.value))
                }
              />

              <input
                className="border p-3 rounded-xl"
                value={product.image}
                onChange={(e) =>
                  updateProduct(product.id, "image", e.target.value)
                }
              />

              <input
                className="border p-3 rounded-xl"
                value={product.sizes.join(",")}
                onChange={(e) =>
                  updateProduct(
                    product.id,
                    "sizes",
                    e.target.value.split(",").map((size) => size.trim())
                  )
                }
              />

              <p className="font-bold">
                Stock restant : {product.stock} pièce(s)
              </p>

              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 text-white py-3 rounded-xl font-bold"
              >
                Supprimer le produit
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}