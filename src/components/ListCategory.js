import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/constants";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
  return <FontAwesomeIcon icon={faUtensils} />;
};

export default class ListCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, kategoriAktif } = this.props;
    return (
      <Col md={2} mt="2">
        <h4>
          <strong>Daftar Kategori</strong>
          <hr />
          <ListGroup>
            {categories &&
              categories.map((category) => (
                <ListGroup.Item
                  key={category.id}
                  onClick={() => changeCategory(category.nama)}
                  className={
                    kategoriAktif === category.nama && "category-aktif"
                  }
                  style={{ cursor: "pointer" }}
                >
                  <Icon nama={category.nama} /> {category.nama}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </h4>
      </Col>
    );
  }
}
