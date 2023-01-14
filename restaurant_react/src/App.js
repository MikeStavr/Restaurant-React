import { useEffect, useState } from "react";
import axios from "axios";
import UploadForm from "./components/uploadForm";
import MenuList from "./components/menuList";

export default function App() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/all")
      .then((dishes) => setDishes(dishes.data));
  }, []);
  return (
    <>
      <UploadForm
        onCreate={(dish) => {
          axios
            .post("http://localhost:8080/create", {
              image: dish.image,
              dishName: dish.name,
              dishPrice: dish.price,
              dishDescription: dish.description,
            })
            .then((d) => {
              setDishes([...dishes, d.data]);
            });
        }}
      />
      <MenuList dishes={dishes} />
    </>
  );
}
