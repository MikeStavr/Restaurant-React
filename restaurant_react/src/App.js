import React from "react";
import axios from "axios";
import UploadForm from "./components/uploadForm";
import MenuList from "./components/menuList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      filter: "all",
    };
    this.deleteDish = this.deleteDish.bind(this);
    this.downloadJSON = this.downloadJSON.bind(this);
  }
  deleteDish(id) {
    const newDishes = this.state.dishes.filter((dish) => dish.id !== id);
    this.setState({ dishes: newDishes });
    axios.delete("http://localhost:8080/delete/" + id);
  }
  downloadJSON() {
    if (this.state.dishes.length === 0) return alert("No dishes to download.");
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(this.state.dishes)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "menu.json";
    element.click();
  }
  componentDidMount() {
    axios.get("http://localhost:8080/all").then((d) => {
      this.setState({ dishes: d.data });
    });
  }
  render() {
    return (
      <>
        {" "}
        <div className="m-2">
          <button className="btn btn-primary" onClick={this.downloadJSON}>
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
                  dishCategory: dish.category,
                },
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .then((d) => {
                this.setState({ dishes: [...this.state.dishes, d.data] });
              });
          }}
        />
        <div className="selectMenuCategory col-sm-1 m-2 mx-auto">
          <select
            className="form-select"
            aria-label="Category"
            onChange={(e) => {
              this.setState({ filter: e.target.value });
            }}
          >
            <option value="all">All</option>
            <option value="appetizers">Appetizers</option>
            <option value="main_courses">Main courses</option>
            <option value="desserts">Desserts</option>
          </select>
        </div>
        <div className="row">
          <MenuList
            dishes={this.state.dishes}
            deleteDish={this.deleteDish}
            filter={this.state.filter}
          />
        </div>
      </>
    );
  }
}
export default App;
