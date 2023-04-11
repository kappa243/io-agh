import { collection, addDoc } from "firebase/firestore";
import { db } from "./fb";


const addOrder = (order) => {
  return addDoc(collection(db, "orders"), order);
};

export default addOrder;