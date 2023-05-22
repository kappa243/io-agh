import { Timestamp, collection, doc, addDoc, getDoc, updateDoc } from "firebase/firestore";
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
  IN_INSPECTION: "W trakcie inspekcji",
  AWAITING_CHOICE: "Oczekuje na wybór części",
  AWAITING_PARTS: "Oczekuje na części",
  IN_PROGRESS: "W trakcie naprawy",
  READY: "Gotowe do odbioru",
  DONE: "Zakończone",
};

export const orderStatusColor = {
  IN_INSPECTION: "primary",
  AWAITING_CHOICE: "warning",
  AWAITING_PARTS: "primary",
  IN_PROGRESS: "primary",
  READY: "warning",
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

export const getOrder = async id => {
  return (await getDoc(doc(db, "orders", id).withConverter(orderConverter))).data();
};
// To update modify order fields in React app and pass order here
export const updateOrder = async order => {
  await updateDoc(doc(collection(db, "orders").withConverter(orderConverter), order.id), order);
};
