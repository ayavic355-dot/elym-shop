"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  sizes: string[];
};
type ProductDB = {
  id: number;
  name: string;
  price: number;
  image: string | null;
  sizes: string | null;
};

type CartItem = Product & {
  selectedSize: string;
};

export default function Home() {
  const whatsappNumber = "33766226161";

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>(
    {}
  );
  const [orderConfirmed, setOrderConfirmed] = useState(false);
 const [clientInfo, setClientInfo] = useState({
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  note: "",
 });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.log(error);
        return;
      }

      setProducts(
        ((data || []) as ProductDB[]).map((p, index) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image || `/images/shirt${index + 1}.jpeg`,
          sizes: p.sizes
            ? p.sizes.split(",").map((s) => s.trim())
            : ["S", "M", "L", "XL"],
        }))
      );
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    const selectedSize = selectedSizes[product.id];

    if (!selectedSize) {
      alert("Veuillez choisir une taille avant d’ajouter ce produit au panier.");
      return;
    }

    setCart([...cart, { ...product, selectedSize }]);
    alert(`Produit ajouté ✅\n${product.name}\nTaille: ${selectedSize}`);
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const confirmOrder = async () => {
  if (
    !clientInfo.fullName ||
    !clientInfo.phone ||
    !clientInfo.address ||
    !clientInfo.city ||
    !clientInfo.postalCode
  ) {
    alert("Remplis les champs obligatoires ⚠️");
    return;
  }

  if (cart.length === 0) {
    alert("Votre panier est vide.");
    return;
  }

  const { error } = await supabase.from("orders").insert([
    {
      customer_name: clientInfo.fullName,
      phone: clientInfo.phone,
      address: clientInfo.address,
      city: clientInfo.city,
      postal_code: clientInfo.postalCode,
      note: clientInfo.note,
      items: JSON.stringify(cart),
      total: total,
      status: "Confirmée",
    },
  ]);

  if (error) {
    console.log(error);
    alert("Erreur commande ❌: " + error.message);
    return;
  }

  setOrderConfirmed(true);
  alert("Votre commande a été validée ✅");
};
  const orderOnWhatsApp = () => {
  if (!orderConfirmed) {
    alert("Confirme la commande d'abord ⚠️");
    return;
  }

 let message = "Bonjour 👋%0AJe souhaite passer une commande:%0A%0A";

    cart.forEach((item, index) => {
      message += `Produit ${index + 1}: ${item.name}%0A`;
      message += `Taille: ${item.selectedSize}%0A`;
      message += `Prix: ${item.price}€%0A%0A`;
    });

    message += `Total: ${total}€`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-md z-50 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center">
        <img
          src="/images/logo.png"
          alt="ELYM Logo"
          className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover"
        />

        <div className="flex gap-3 md:gap-8 text-xs md:text-sm font-semibold">
          <a href="#home">Accueil</a>
          <a href="#products">Shop</a>
          <a href="#cart">Panier ({cart.length})</a>
        </div>
      </nav>

      <section
        id="home"
        className="min-h-screen flex items-center justify-center text-center px-6 relative overflow-hidden bg-black"
      >
        <img
          src="/images/shirt-home.jpeg"
          alt="ELYM Home"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[100%] lg:w-[90%] max-h-[95vh] object-contain opacity-45 z-0"
        />

        <div className="absolute inset-0 bg-black/35 z-0"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">ELYM</h1>
          <a
            href="#products"
            className="bg-white text-black px-8 py-4 rounded-full font-semibold"
          >
            Voir les produits
          </a>
        </div>
      </section>

      <section
        id="products"
        className="px-4 md:px-8 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white text-black rounded-3xl p-4 shadow-lg flex flex-col h-auto md:h-[580px]"
          >
            <div className="h-[300px] w-full flex items-center justify-center bg-white rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col flex-1 mt-4">
              <h2 className="text-2xl font-bold min-h-[64px]">
                {product.name}
              </h2>

              <p className="text-3xl font-bold mt-2">{product.price}€</p>

              <div className="flex gap-2 mt-4 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      setSelectedSizes({
                        ...selectedSizes,
                        [product.id]: size,
                      })
                    }
                    className={`px-4 py-2 rounded-xl border ${
                      selectedSizes[product.id] === size
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full mt-6 md:mt-auto bg-gray-800 text-white py-3 rounded-xl"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </section>

      <section id="cart" className="px-4 md:px-8 py-20">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Panier ({cart.length})
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-400">Votre panier est vide</p>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-white text-black rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 rounded-xl"
                    />

                    <div>
                      <h3 className="font-bold text-xl">{item.name}</h3>
                      <p>Taille : {item.selectedSize}</p>
                      <p>{item.price}€</p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl w-full md:w-fit"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white text-black rounded-3xl p-6 max-w-2xl mx-auto">
             <h3 className="text-2xl font-bold mb-6">Informations client</h3>

             <div className="grid gap-4">
               <input className="border p-3 rounded-xl" placeholder="Nom complet *" value={clientInfo.fullName} onChange={(e) => setClientInfo({ ...clientInfo, fullName: e.target.value })} />
               <input className="border p-3 rounded-xl" placeholder="Téléphone *" value={clientInfo.phone} onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })} />
               <input className="border p-3 rounded-xl" placeholder="Adresse *" value={clientInfo.address} onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })} />
               <input className="border p-3 rounded-xl" placeholder="Ville *" value={clientInfo.city} onChange={(e) => setClientInfo({ ...clientInfo, city: e.target.value })} />
               <input className="border p-3 rounded-xl" placeholder="Code postal *" value={clientInfo.postalCode} onChange={(e) => setClientInfo({ ...clientInfo, postalCode: e.target.value })} />
               <textarea className="border p-3 rounded-xl" placeholder="Note optionnelle" value={clientInfo.note} onChange={(e) => setClientInfo({ ...clientInfo, note: e.target.value })} />
             </div>
           </div>
            <div className="text-center mt-10">
              <h3 className="text-3xl font-bold mb-4">Total : {total}€</h3>

            <button
              onClick={confirmOrder}
              className="w-full md:w-fit bg-white text-black px-8 py-4 rounded-full font-bold"
            >
            Confirmer la commande
            </button>

            {orderConfirmed && (
             <p className="text-green-400 font-bold mt-4">
               ✅ Votre commande a été validée
            </p>
            )}

              <button
               onClick={orderOnWhatsApp}
               className="block mx-auto mt-4 w-full md:w-fit bg-green-500 px-8 py-4 rounded-full font-bold text-black"
             >
              Commander sur WhatsApp
              </button>

             <a
               href={`https://www.paypal.com/paypalme/ELYM9/${total}`}
               target="_blank"
               rel="noopener noreferrer"
               className="block mx-auto mt-4 w-full md:w-fit bg-blue-500 text-white px-8 py-4 rounded-full font-bold"
             >
               Payer avec PayPal
            </a>

           <div className="mt-12 max-w-3xl mx-auto bg-white/10 border border-white/20 rounded-3xl p-6">
             <h3 className="text-3xl font-bold mb-6 text-center">
              Suivi de commande
             </h3>

           <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
             <div className="bg-green-500 text-black rounded-2xl p-4 font-bold">
              1. Confirmée
             </div>
             <div className="bg-white text-black rounded-2xl p-4 font-bold">
              2. Paiement
             </div>
             <div className="bg-white text-black rounded-2xl p-4 font-bold">
              3. Emballage
             </div>
             <div className="bg-white text-black rounded-2xl p-4 font-bold">
              4. En route
             </div>
             <div className="bg-white text-black rounded-2xl p-4 font-bold">
              5. Livré
             </div>
           </div>
         </div>
       </div>
      </>
        )}
      </section>
    </main>
  );
}