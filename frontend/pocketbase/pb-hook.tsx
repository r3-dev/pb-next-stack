import { useContext } from "react";
import PocketBaseContext from "./pb-context";

export default function usePocketBase() {
  return useContext(PocketBaseContext);
}
