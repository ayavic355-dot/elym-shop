"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Order = {
  id: number;
  customer_name: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  total: number;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setOrders(data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Orders Dashboard
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white text-black p-6 rounded-3xl"
          >
            <h2 className="text-2xl font-bold mb-4">
              Commande #{order.id}
            </h2>

            <p><strong>Nom:</strong> {order.customer_name}</p>
            <p><strong>Téléphone:</strong> {order.phone}</p>
            <p><strong>Adresse:</strong> {order.address}</p>
            <p><strong>Ville:</strong> {order.city}</p>
            <p><strong>Code postal:</strong> {order.postal_code}</p>
            <p><strong>Total:</strong> {order.total}€</p>
          </div>
        ))}
      </div>
    </main>
  );
}