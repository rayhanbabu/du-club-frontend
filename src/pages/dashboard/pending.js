/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import useFetch from "@/hooks/useFetch";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Style from "@/styles/dashboard/dashboard.module.css";
import { useRouter } from "next/router";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import TopTitle from "@/components/topTitle/TopTitle";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "@/utils/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function PreviousDoing() {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const cookieValue = Cookies.get("TOKEN_LOGIN");

  useEffect(() => {
    axios
      .get(BASE_URL + `/duclub/api/pending_product_view`, {
        headers: {
          duclub_token: cookieValue,
        },
      })
      .then((response) => {
        setData(response?.data);
      });
  }, [cookieValue]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Cancel button
  const handleCancel = async (saleID) => {
    // Show a confirmation dialog

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete This Product",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deleted!",
    });

    if (result.isConfirmed) {
      const response = await fetch(
        BASE_URL + `/duclub/api/product_delete/${saleID}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            duclub_token: cookieValue,
          },
        }
      );
      const result1 = await response.json();
      if (result1.status === "success") {
        setData(!data);
        await Swal.fire({
          title: "Product Deleted",
          text: "Product Delete successfully.",
          icon: "success",
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>DASHBOARD::Previous Doing</title>
        <meta name="description" content="Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        <>
          <div className={`${Style.mainContainer} d-flex`}>
            {/* Dashboard Left Side and Header */}
            <DashboardLeftSide />

            {/* Main Content */}
            <div className={`${Style.content} px-4`}>
              <Row style={{ marginTop: "20px" }}>
                <Col md={8} sm={12}>
                  <Col md={10} sm={12}>
                    <TopTitle title="Pending Order" textAlign="left" />
                    <div
                      style={{
                        background: "#fff",
                        padding: "25px 50px",
                        borderRadius: "20px",
                      }}
                    >
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Grand Total</th>
                            <th>Delete</th>
                            <th>Product</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.data?.map((item) => (
                            <tr key={item.saleID}>
                              <td>{item.salesDate}</td>
                              <td>{item.grandTotal}</td>
                              <td className={Style.tableText}>
                                {
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleCancel(item?.saleID)}
                                  >
                                    Cancel
                                  </Button>
                                }
                              </td>
                              <td>
                                {item.products.map((product) => (
                                  <Table
                                    striped
                                    bordered
                                    hover
                                    key={product.saleProductID}
                                  >
                                    <tbody>
                                      <tr>
                                        <td>{product.productName}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.productPrice}</td>
                                        <td>{product.price}</td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                ))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Col>
              </Row>
            </div>
          </div>
        </>
      </main>
    </>
  );
}
