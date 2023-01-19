import React from "react";

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: "",
      dishName: "",
      dishCategory: "appetizers",
      dishPrice: "",
      dishDescription: "",
    };
    this.handleChangePrice = this.handleChangePrice.bind(this);
  }
  handleChangePrice(e) {
    const result = e.target.value.replace(/\D/g, "");
    this.setState({ dishPrice: result });
  }

  render() {
    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (
              !this.state.file ||
              !this.state.dishName ||
              !this.state.dishPrice ||
              !this.state.dishDescription ||
              !this.state.dishCategory
            ) {
              alert("Please fill in all fields");
              return;
            }
            this.props.onCreate({
              image: this.state.file,
              name: this.state.dishName,
              price: parseInt(this.state.dishPrice),
              description: this.state.dishDescription,
              category: this.state.dishCategory,
            });
            this.setState({
              file: null,
              fileName: "",
              dishName: "",
              dishCategory: "appetizers",
              dishPrice: "",
              dishDescription: "",
            });
          }}
        >
          <div className="card mx-auto mt-3" style={{ width: "50rem" }}>
            <div className="input-group mb-3">
              <span className="input-group-text">Dish name</span>
              <input
                type="text"
                value={this.state.dishName}
                onChange={(e) => {
                  this.setState({ dishName: e.target.value });
                }}
                className="form-control"
                aria-label="dish name"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Dish price</span>
              <input
                type="text"
                value={this.state.dishPrice}
                onChange={this.handleChangePrice}
                className="form-control"
                aria-label="dish price"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Dish description</span>
              <textarea
                rows={2}
                value={this.state.dishDescription}
                onChange={(e) => {
                  this.setState({ dishDescription: e.target.value });
                }}
                className="form-control"
                aria-label="dish name"
              />
            </div>{" "}
            <div className="input-group mb-3">
              <input
                type="file"
                value={this.state.fileName}
                onChange={(e) => {
                  this.setState({ fileName: e.target.value });
                  this.setState({ file: e.target.files[0] });
                }}
                accept="image/png, image/gif, image/jpeg"
                className="form-control"
                aria-label="dish name"
              />
            </div>
            <div className="selectMenuCategory">
              <select
                className="form-select"
                aria-label="Category"
                onChange={(e) => {
                  this.setState({ dishCategory: e.target.value });
                }}
                value={this.state.dishCategory}
              >
                <option value="appetizers" defaultChecked>
                  Appetizers
                </option>
                <option value="main_courses">Main courses</option>
                <option value="desserts">Desserts</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary mx-auto m-2"
              style={{ width: "50%" }}
            >
              Add dish
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default UploadForm;
