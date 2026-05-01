"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  sizes: string[];
};

type CartItem = Product & {
  selectedSize: string;
};

export default function Home() {
  const whatsappNumber = "33766226161";

  const products: Product[] = [
    { id: 1, name: "ELYM T-Shirt Model 1", price: 50, image: "/images/shirt1.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 2, name: "ELYM T-Shirt Model 2", price: 50, image: "/images/shirt2.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 3, name: "ELYM T-Shirt Model 3", price: 50, image: "/images/shirt3.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 4, name: "ELYM T-Shirt Model 4", price: 50, image: "/images/shirt4.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 5, name: "ELYM T-Shirt Model 5", price: 50, image: "/images/shirt5.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 6, name: "ELYM T-Shirt Model 6", price: 50, image: "/images/shirt6.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 7, name: "ELYM T-Shirt Model 7", price: 50, image: "/images/shirt7.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 8, name: "ELYM T-Shirt Model 8", price: 50, image: "/images/shirt8.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 9, name: "ELYM T-Shirt Model 9", price: 50, image: "/images/shirt9.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 10, name: "ELYM T-Shirt Model 10", price: 50, image: "/images/shirt10.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 11, name: "ELYM T-Shirt Model 11", price: 50, image: "/images/shirt11.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 12, name: "ELYM T-Shirt Model 12", price: 50, image: "/images/shirt12.jpeg", sizes: ["S", "M", "L", "XL"] },
  ];

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const [clientInfo, setClientInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    note: "",
  });

  const addToCart = (product: Product) => {
    const selectedSize = selectedSizes[product.id];

    if (!selectedSize) {
      alert("Veuillez choisir une taille avant d’ajouter ce produit au panier.");
      return;
    }

    setCart([...cart, { ...product, selectedSize }]);

    alert(
      `Votre article a bien été ajouté au panier 🛍️\n\nProduit : ${product.name}\nTaille : ${selectedSize}`
    );
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const confirmOrder = () => {
    if (
      !clientInfo.fullName ||
      !clientInfo.phone ||
      !clientInfo.address ||
      !clientInfo.city ||
      !clientInfo.postalCode
    ) {
      alert("Veuillez remplir tous les champs obligatoires pour continuer.");
      return;
    }

    if (cart.length === 0) {
      alert("Votre panier est vide. Veuillez ajouter un produit avant de continuer.");
      return;
    }

    setOrderConfirmed(true);
    alert("Votre commande a été confirmée avec succès 🎉");
  };

  const orderOnWhatsApp = () => {
    if (!orderConfirmed) {
      alert("Veuillez confirmer votre commande avant de continuer.");
      return;
    }

    let message = "Bonjour 👋%0AJe souhaite passer une commande :%0A%0A";

    cart.forEach((item, index) => {
      message += `🛍 Produit ${index + 1} : ${item.name}%0A`;
      message += `📏 Taille : ${item.selectedSize}%0A`;
      message += `💰 Prix : ${item.price}€%0A%0A`;
    });

    message += `💳 Total : ${total}€%0A%0A`;
    message += `👤 Nom : ${clientInfo.fullName}%0A`;
    message += `📞 Téléphone : ${clientInfo.phone}%0A`;
    message += `📍 Adresse : ${clientInfo.address}%0A`;
    message += `🏙 Ville : ${clientInfo.city}%0A`;
    message += `📮 Code postal : ${clientInfo.postalCode}%0A`;
    message += `📝 Note : ${clientInfo.note || "Aucune"}%0A%0A`;
    message += "Merci 🙏";

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
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

      {/* HERO */}
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

      {/* PRODUCTS */}
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

      {/* CART */}
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

            {/* CLIENT INFO */}
            <div className="mt-10 bg-white text-black rounded-3xl p-6 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-6">Informations client</h3>

              <div className="grid gap-4">
                <input required className="border p-3 rounded-xl" placeholder="Nom complet *" value={clientInfo.fullName} onChange={(e) => setClientInfo({ ...clientInfo, fullName: e.target.value })} />
                <input required className="border p-3 rounded-xl" placeholder="Téléphone *" value={clientInfo.phone} onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })} />
                <input required className="border p-3 rounded-xl" placeholder="Adresse *" value={clientInfo.address} onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })} />
                <input required className="border p-3 rounded-xl" placeholder="Ville *" value={clientInfo.city} onChange={(e) => setClientInfo({ ...clientInfo, city: e.target.value })} />
                <input required className="border p-3 rounded-xl" placeholder="Code postal *" value={clientInfo.postalCode} onChange={(e) => setClientInfo({ ...clientInfo, postalCode: e.target.value })} />
                <textarea className="border p-3 rounded-xl" placeholder="Note optionnelle" value={clientInfo.note} onChange={(e) => setClientInfo({ ...clientInfo, note: e.target.value })} />
              </div>
            </div>

            {/* TOTAL + BUTTONS */}
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
                  ✅ Votre commande a été confirmée
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