import React from "react";
import Skeleton from "react-loading-skeleton";
import ImagePlaceholder from "@/assets/images/image.json";
import Lottie from "lottie-react";
import "react-loading-skeleton/dist/skeleton.css";
import { Col, Container, Row } from "react-bootstrap";

const MemberSkeleton = () => {
  return (
    <Container>
      <Row>
        <Col md={5} className="mx-auto mt-3 mb-3">
          <Skeleton />
        </Col>
      </Row>
      <Row>
        <Col lg={4} md={6} sm={12} className="p-2">
          <div className="card shadow-sm h-100 rounded-3 bg-white">
            <Lottie
              className="w-100"
              animationData={ImagePlaceholder}
              loop={true}
            />
            <div className="card-body">
              <Skeleton count={3} />
            </div>
          </div>
        </Col>
        <Col lg={4} md={6} sm={12} className="p-2">
          <div className="card shadow-sm h-100 rounded-3 bg-white">
            <Lottie
              className="w-100"
              animationData={ImagePlaceholder}
              loop={true}
            />
            <div className="card-body">
              <Skeleton count={3} />
            </div>
          </div>
        </Col>
        <Col lg={4} md={6} sm={12} className="p-2">
          <div className="card shadow-sm h-100 rounded-3 bg-white">
            <Lottie
              className="w-100"
              animationData={ImagePlaceholder}
              loop={true}
            />
            <div className="card-body">
              <Skeleton count={3} />
            </div>
          </div>
        </Col>
        <Col lg={4} md={6} sm={12} className="p-2">
          <div className="card shadow-sm h-100 rounded-3 bg-white">
            <Lottie
              className="w-100"
              animationData={ImagePlaceholder}
              loop={true}
            />
            <div className="card-body">
              <Skeleton count={3} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MemberSkeleton;
