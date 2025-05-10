// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import DeliveryList from "@/components/dashboard/delivery/DeliveryList";
// import { Order } from "@/types/delivery";
// import { useSession } from "next-auth/react";
// import toast from "react-hot-toast";
// import { AuthGuard } from "@/components/auth/AuthGuard";

// const DeliveryPage = () => {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!session?.user?.id) return;

//       try {
//         const response = await fetch(
//           `/api/delivery?accountId=${session.user.id}`
//         );
//         if (!response.ok) throw new Error("Failed to fetch delivery orders");

//         const data = await response.json();
//         setOrders(data);
//       } catch (error) {
//         toast.error("Error fetching orders");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (session?.user?.role === "SELLER") {
//       fetchOrders();
//     } else {
//       router.push("/dashboard"); // Redirect if not a seller
//     }
//   }, [session, router]);

//   if (loading) {
//     return (
//       <div className="p-6">
//         <p className="text-sm text-gray-600">Loading orders...</p>
//       </div>
//     );
//   }

//   return (
//     <AuthGuard allowedRoles={["SELLER"]}>
//       <div className="p-6 space-y-4">
//         <h1 className="text-2xl font-bold">Delivery Management</h1>
//         <p className="text-sm text-gray-600">
//           Only accessible by sellers. Simulates delivery flow via button.
//         </p>

//         <DeliveryList orders={orders} setOrders={setOrders} />
//       </div>
//     </AuthGuard>
//   );
// };

// export default DeliveryPage;
