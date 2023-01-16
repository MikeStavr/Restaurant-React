import { useEffect, useState } from "react";
import axios from "axios";
import UploadForm from "./components/uploadForm";
import MenuList from "./components/menuList";

export default function App() {
  const [dishes, setDishes] = useState([]);

  function deleteDish(id) {
    const newDishes = dishes.filter((dish) => dish.id !== id);
    setDishes(newDishes);
    axios.delete("http://localhost:8080/delete/" + id);
  }

  const downloadJSON = () => {
    if (dishes.length === 0) return alert("No dishes to download.");
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(dishes)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "menu.json";
    element.click();
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/all")
      .then((dishes) => setDishes(dishes.data));
  }, []);
  return (
    <>
      <div className="m-2">
        <button className="btn btn-primary" onClick={downloadJSON}>
          Download menu as JSON.
        </button>
      </div>
      <UploadForm
        onCreate={(dish) => {
          axios
            .post(
              "http://localhost:8080/create",
              {
                image: dish.image,
                dishName: dish.name,
                dishPrice: dish.price,
                dishDescription: dish.description,
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((d) => {
              setDishes([...dishes, d.data]);
            });
        }}
      />
      <div className="row">
        <MenuList dishes={dishes} deleteDish={deleteDish} />
      </div>
    </>
  );
}
