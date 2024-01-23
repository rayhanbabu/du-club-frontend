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
  }, [data]);

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
      text: "Do you want to delete this Order",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
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
        // setData(!data);
        await Swal.fire({
          title: "Deleted",
          text: "Order Deleted successfully.",
          icon: "success",
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>DASHBOARD::Previous Orders</title>
        <meta name="description" content="Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.png" />
      </Head>
      <main>
        <>
          <div className={`${Style.mainContainer} d-flex`}>
            {/* Dashboard Left Side and Header */}
            <DashboardLeftSide />

            {/* Main Content */}
            <div className={`${Style.content} px-4`}>
              <Row style={{ marginTop: "10px" }}>
                <Col md={8} sm={12}>
                  <Col md={12} sm={12}>
                    {/* <TopTitle className=" mt-5" title="" textAlign="" /> */}
                    <h2 className="text-start fw-bold fs-4 mt-4">Pending Order</h2>
                    <div
                      style={{
                        background: "#fff",
                        padding: "10px 15px",
                        borderRadius: "20px",
                        marginTop:"2px"
                      }}
                    >
                      <Table striped bordered hover responsive>
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
                                    Delete
                                  </Button>
                                }
                              </td>
                              <td>
                                {item?.products?.map((product) => (
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
