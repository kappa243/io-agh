import { Timestamp, collection, addDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../logic/fb";

export const orderConverter = {
  toFirestore: order => {
    return {
      car: order.car,
      client: order.client,
      cost: order.cost,
      profit: order.profit,
      status: order.status,
      dueDate: Timestamp.fromDate(order.dueDate),
      description: order.description,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      car: data.car,
      client: data.client,
      cost: data.cost,
      profit: data.profit,
      status: data.status,
      dueDate: data.dueDate.toDate(),
      description: data.description,
    };
  },
};

export const orderStatusText = {
  AWAITING_PARTS: "Oczekuje na części",
  IN_PROGRESS: "W trakcie naprawy",
  DONE: "Zakończone",
};

export const orderStatusColor = {
  AWAITING_PARTS: "warning",
  IN_PROGRESS: "primary",
  DONE: "success",
};

export const useGetOrders = () => {
  const [orders,,,] = useCollectionData(
    collection(db, "orders").withConverter(orderConverter),
    {
      initialValue: [],
    }
  );
  return orders;
};

export const addOrder = async order => {
  await addDoc(collection(db, "orders").withConverter(orderConverter), order);
};
