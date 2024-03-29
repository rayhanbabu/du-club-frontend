/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import useFetch from "@/hooks/useFetch";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Style from "@/styles/dashboard/previousDoing.module.css";
import { useRouter } from "next/router";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import TopTitle from "@/components/topTitle/TopTitle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { RiClosedCaptioningLine } from "react-icons/ri";
import Cookies from "js-cookie";
import { BASE_URL } from "@/utils/api";

export default function PreviousDoing() {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [preData, setpreData] = useState([]);
  const router = useRouter();
  const cookieValue = Cookies.get("TOKEN_LOGIN");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePreviousSubmit = async (data) => {
    const { fromDate, toDate } = data;
    console.log(fromDate);
    setLoadingBtn(true);

    axios
      .get(
        BASE_URL + `/duclub/api/member_ledger?from=${fromDate}&to=${toDate}`,
        {
          headers: {
            duclub_token: cookieValue,
          },
        }
      )
      .then((response) => {
        setpreData(response?.data);
        setLoadingBtn(false);
      });
  };

  return (
    <>
      <Head>
        <title>DASHBOARD::Previous Bill</title>
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
            <div className={`${Style.content} w-100 px-4`}>
              <Row style={{ marginTop: "60px" }}>
                <div className="md:d-flex mb-2 mt-0" style={{ width: "100%" }}>
                  <Col lg={8} md={12} sm={12}>
                    {/* <TopTitle title="Previous Bill" textAlign=""  /> */}
                    <h2 className="text-start fw-bold fs-4 mt-4">Previous Orders History</h2>
                    <div
                      style={{
                        background: "#fff",
                        padding: "10px 20px",
                        borderRadius: "20px",
                        marginTop:"5px"
                      }}
                      className="shadow-lg"
                    >
                      {/* Form header and login Form data */}
                      {/* Title */}
                      <Form onSubmit={handleSubmit(handlePreviousSubmit)} className="w-full">
                        <div className={Style.date}>
                          <div className={Style.from}>
                            <Form.Group className="mb-3" controlId="formEmail">
                              <Form.Label className={Style.inputLabel}>
                                From Date
                              </Form.Label>
                              <div className={Style.textField}>
                                <Form.Control
                                  type="date"
                                  className={`${Style.inputField} remove-focus`}
                                  {...register("fromDate", { required: true })}
                                />
                              </div>
                            </Form.Group>
                          </div>
                          <div className={Style.to}>
                            <Form.Group className="mb-3" controlId="formEmail">
                              <Form.Label className={Style.inputLabel}>
                                To Date
                              </Form.Label>
                              <div className={Style.textField}>
                                <Form.Control
                                  type="date"
                                  className={`${Style.inputField} remove-focus`}
                                  {...register("toDate", { required: true })}
                                />
                              </div>
                            </Form.Group>
                          </div>

                          {/* Submit Button */}
                          <div className={Style.submit}>
                            <Button
                              variant="primary"
                              type="submit"
                              disabled={loadingBtn}
                            >
                              {loadingBtn ? "Processing...." : "Submit"}
                            </Button>
                          </div>
                        </div>
                      </Form>
                    </div>

                    {/* Table */}
                    {preData?.data?.data?.ledger?.length && (
                      <div
                        style={{
                          background: "#fff",
                          padding: "25px 50px",
                          borderRadius: "20px",
                          marginTop: "50px",
                        }}
                        className="shadow-lg"
                      >
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Product Info</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {preData?.data?.data?.ledger?.map((item) => (
                              <tr key={item.ledger_id}>
                                <td>{item.trans_date}</td>
                                <td>{item.view_product_info}</td>
                                <td>{item.dr}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </Col>
                </div>
              </Row>
            </div>
          </div>
        </>

        {/* <>
          <DashboardLeftSide />

          <div
            className={`${Style.content} px-4`}
            style={{ marginTop: "70px" }}
          >
            <TopTitle title="Previous Details" textAlign="left" />
            <Row>
              <Col md={8} sm={12}>
                
              </Col>
            </Row>
          </div>
        </> */}
      </main>
    </>
  );
}
