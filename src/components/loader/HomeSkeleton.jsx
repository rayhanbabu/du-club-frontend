import React from "react";
import Skeleton from "react-loading-skeleton";
import ImagePlaceholder from "@/assets/images/image.json";
import Lottie from "lottie-react";
import "react-loading-skeleton/dist/skeleton.css";
import { Col, Container, Row } from "react-bootstrap";

const HomeSkeleton = () => {
  return (
    <Container className="min-vh-100">
      {/* <Row>
        <Col md={5} className="mx-auto mt-3 mb-3">
          <Skeleton />
        </Col>
      </Row> */}
        <Col lg={12} md={12} sm={12} className="p-3 ">
          <div className=" shadow-sm rounded-1 bg-white">
            <div className="card-body">
              <Skeleton count={2} />
            </div>
          </div>
        </Col>


      <Row>
        <Col lg={12} md={12} sm={12} className="p-3 ">
          <div className=" shadow-sm rounded-1 bg-white">
            <div className="card-body">
              <Skeleton count={5} />
            </div>
          </div>
        </Col>

        <Col lg={12} md={12} sm={12} className="p-3 ">
          <div className=" shadow-sm rounded-1 bg-white">
            <div className="card-body">
              <Skeleton count={5} />
            </div>
          </div>
        </Col>



      </Row>
    </Container>
  );
};

export default HomeSkeleton;
