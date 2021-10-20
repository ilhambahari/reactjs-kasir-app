import { Col, Container, Row } from "react-bootstrap";
import { Hasil, ListCategory, Menus } from "../components";

import React, { Component } from "react";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      kategoriAktif: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.kategoriAktif)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });

    this.getListKeranjang();
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.keranjangs !== prevState.keranjangs) {
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then((res) => {
  //         const keranjangs = res.data;
  //         this.setState({ keranjangs });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeCategory = (value) => {
    this.setState({
      kategoriAktif: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { menus, kategoriAktif, keranjangs } = this.state;
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategory
              changeCategory={this.changeCategory}
              kategoriAktif={kategoriAktif}
            />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row className="overflow-auto menu">
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil
              keranjangs={keranjangs}
              {...this.props}
              getListKeranjang={this.getListKeranjang}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
