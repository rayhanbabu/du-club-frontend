/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import Style from "./dashboardHeader.module.css";
import Link from "next/link";
import { baseImgUrl } from "@/utils/imgUrl";
import { BiSolidEditLocation } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const DashboardHeader = ({ open, setOpen }) => {
  const [itemValue, setItemValue] = useState(null);
  const router = useRouter();

  const handleControlSidebar = () => {
    setOpen(!open);
  };

  // Logout button
  const handleLogout = () => {
    Cookies.remove("TOKEN_LOGIN");
    Cookies.remove("USER_ID");
    Cookies.remove("USER_NAME");
    router.push("/");
  };

  return (
    <div className={`${Style.dashboardHeader} pt-2`}>
      <div className="d-flex justify-content-between">
        <div>
          <div className="d-flex d-block">
            <button
              className={`${Style.barIcon} btn px-1 py-0 open-btn`}
              onClick={handleControlSidebar}
            >
              <FaBars className="fs-4 ms-4" />
            </button>
            <Link href="/" className="text-decoration-none text-black">
              <span class="ps-3 fs-4 fw-bold">DU CLUB</span>
            </Link>
          </div>
        </div>
        <div>
          <p>Name</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
