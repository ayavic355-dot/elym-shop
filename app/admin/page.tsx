export default function AdminPage() {
  const commandes = [
    {
      id: 1,
      client: "Aya Vic",
      phone: "0033125684948",
      product: "ELYM T-Shirt Model 11",
      size: "XL",
      total: 50,
      status: "Confirmée",
    },
    {
      id: 2,
      client: "Sara",
      phone: "0033766226161",
      product: "ELYM T-Shirt Model 2",
      size: "L",
      total: 50,
      status: "Paiement",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-10 text-center">
        Admin Dashboard 👑
      </h1>

      <div className="space-y-6">
        {commandes.map((item) => (
          <div
            key={item.id}
            className="bg-white text-black rounded-3xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-2">
              {item.client}
            </h2>

            <p><strong>Téléphone :</strong> {item.phone}</p>
            <p><strong>Produit :</strong> {item.product}</p>
            <p><strong>Taille :</strong> {item.size}</p>
            <p><strong>Total :</strong> {item.total}€</p>
            <p><strong>Status :</strong> {item.status}</p>
          </div>
        ))}
      </div>
    </main>
  );
}