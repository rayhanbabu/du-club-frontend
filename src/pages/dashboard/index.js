/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Col, Container, Row, Table, Card, Button } from "react-bootstrap";
import Style from "@/styles/dashboard/dashboard.module.css";
import { useRouter } from "next/router";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { BASE_URL } from "@/utils/api";
import MemberSkeleton from "@/components/loader/MemberSkeleton";

function getCurrentDayName() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  const dayIndex = now.getDay();
  return daysOfWeek[dayIndex];
}

export default function Dashboard() {
  const [counters, setCounters] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const cookieValue = Cookies.get("TOKEN_LOGIN");
  const dayName = getCurrentDayName();

  //console.log(cookieValue);

  useEffect(() => {
    setLoading(true);
    axios
      .get(BASE_URL + `/duclub/api/product_view?dayName=${dayName}`)
      .then((response) => {
        setData(response?.data?.data);
        setLoading(false);
      });
  }, [dayName]);

  const increment = (id) => {
   // console.log(id);
    setCounters((prevCounters) => ({
      ...prevCounters,
      [id]: (prevCounters[id] || 0) + 1,
    }));
  };

  const decrement = (id) => {
    if (counters[id] && counters[id] > 1) {
      setCounters((prevCounters) => ({
        ...prevCounters,
        [id]: prevCounters[id] - 1,
      }));
    }
  };

  const handleCartClick = async (id, price, quantity) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to place the order",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Placed!",
      });

      if (result.isConfirmed) {
        if (typeof quantity != "undefined") {
          quantity = quantity;
        } else {
          quantity = 1;
        }

        const response = await fetch(
          `${BASE_URL}/duclub/api/product_add?productID=${id}&qty=${quantity}&price=${price}`,
          {
            headers: {
              "Cache-Control": "no-cache",
              duclub_token: cookieValue,
            },
          }
        );
        const result = await response.json();
        if (result.status === "success") {
          Swal.fire({
            title: "Order Placed!",
            text: "Your order has been placed successfully.",
            icon: "success",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>DASHBOARD::</title>
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
              <Row className="pb-4 pt-4">
                <Col lg={10} md={8}>
                  {loading ? (
                    <MemberSkeleton />
                  ) : (
                    <Row>
                      {data?.data?.map((item) => (
                        <Col lg={4} md={6} sm={12} key={item.id}>
                          <Card className="d-flex flex-row px-2 mb-4">
                            <div className="d-flex align-items-center">
                              <Card.Img
                                className={Style.img}
                                variant="top"
                                src={`https://dhakauniversityclub.com/${item?.productImgUrl}`}
                              />
                            </div>
                            <div>
                              <Card.Body>
                                <Card.Title className={Style.title}>
                                  {item?.productName}
                                </Card.Title>
                                <Card.Subtitle
                                  className="mb-3"
                                  style={{ fontSize: "15px", color: "#0B5ED7" }}
                                >
                                  ৳ {item?.productPrice}
                                </Card.Subtitle>
                                <div className={Style.wrapper}>
                                  <span
                                    className={Style.minus}
                                    onClick={() => decrement(item.productID)}
                                  >
                                    -
                                  </span>
                                  <span className={Style.num}>
                                    {counters[item.productID] || 1}
                                  </span>
                                  <span
                                    className={Style.plus}
                                    onClick={() => increment(item.productID)}
                                  >
                                    +
                                  </span>
                                </div>
                                <div className="d-flex justify-content-center">
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleCartClick(
                                        item.productID,
                                        item?.productPrice,
                                        counters[item.productID]
                                      )
                                    }
                                  >
                                    Placed Order
                                  </Button>
                                </div>
                              </Card.Body>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </>
      </main>
    </>
  );
}
