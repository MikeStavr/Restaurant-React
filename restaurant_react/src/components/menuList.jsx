import React from "react";
class MenuList extends React.Component {
  render() {
    return this.props.dishes
      .filter(
        (dish) =>
          dish.dishCategory === this.props.filter || this.props.filter === "all"
      )
      .map((dish) => {
        return (
          <div
            key={dish.id}
            className="mt-5 m-3 card align-items-center"
            style={{ width: "18rem" }}
          >
            <div className="ms-auto m-1">
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  this.props.deleteDish(dish.id);
                }}
              >
                X
              </button>
            </div>
            <img
              className="card-img-top"
              src={`http://localhost:8080/${dish.image}`}
              alt=""
              style={{ width: "75%" }}
            />
            <div className="card-body">
              <h5 className="card-title">{dish.dishName}</h5>
              <p className="card-text fst-italic">
                <span className="fw-bold fst-normal">
                  {dish.dishCategory === "all"
                    ? "All"
                    : "" || dish.dishCategory === "appetizers"
                    ? "Appetizer"
                    : "" || dish.dishCategory === "main_courses"
                    ? "Main course"
                    : "" || dish.dishCategory === "desserts"
                    ? "Dessert"
                    : ""}
                </span>
                <br />
                {dish.dishDescription} <br /> Price: €{dish.dishPrice}
              </p>
            </div>
          </div>
        );
      });
  }
}
export default MenuList;
