import { useEffect, useState } from "react";
import axios from "axios";
import UploadForm from "./components/uploadForm";
import MenuList from "./components/menuList";

export default function App() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/all").then((allDishes) => {
      setDishes(allDishes.data);
    });
  });
  return (
    <>
      <UploadForm
        onCreate={(d) => {
          axios
            .post("http://localhost:8080/upload", {
              dishName: d.name,
              dishPrice: d.price,
              image: d.image,
            })
            .then((dish) => {
              let newDishes = [...dishes, dish.data];
              setDishes(newDishes);
            });
        }}
      />
      <MenuList dishes={dishes} />
    </>
  );
}
