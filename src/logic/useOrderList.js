import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "./fb";

const useOrderList = () => {
  const [orders,,] = useCollection(collection(db, "orders"));
  return orders ? orders.docs.map((doc) => ({ id: doc.id, ...doc.data() })) : [];
};

export default useOrderList;
