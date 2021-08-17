// STYLES
import styles from "./Layout.module.scss";
// ICONS
import { HiMenu, HiHome, HiOutlineViewGrid, HiCode } from "react-icons/hi";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";
// NEXT COMPONENTS
import Link from "next/link";
import Image from "next/image";
// REACT HOOKS
import { useState, useContext, useEffect } from "react";
// NEXT HOOKS
import { useRouter } from "next/router";
// CUSTOM COMPONENTS
import Tooltip from "./tooltip/TooltipCom.js";
import SearchOverlay from "./searchOverlay/SearchOverlay";
// CONTEXT
import { AppContext } from "../../context/context";
// IMAGE SOURCES
import logoSrc from "../../public/logo.svg";
const sidebarData = [
  {
    text: "Home",
    icon: <HiHome />,
    link: "/",
  },
  {
    text: "Blog",
    icon: <HiOutlineViewGrid />,
    link: "/blog",
  },
  {
    text: "Coding",
    icon: <HiCode />,
    link: "/blog/codingtips",
  },
  {
    text: "HTML",
    icon: <FaHtml5 />,
    link: "/blog/html",
  },
  {
    text: "CSS",
    icon: <FaCss3Alt />,
    link: "/blog/css",
  },
  {
    text: "JavaScript",
    icon: <SiJavascript />,
    link: "/blog/javascript",
  },
];
const Layout = ({ children }) => {
  const { displayTooltip, hideTooltip, isSearchOverlayActive } =
    useContext(AppContext);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const router = useRouter();
  const handleMouseEnter = (e, text) => {
    const data = {
      x: e.target.offsetLeft + e.target.clientWidth + 20,
      y: e.target.offsetTop + e.target.clientHeight / 2 + window.scrollY,
      text: text,
    };

    displayTooltip(data);
  };
  return (
    <div className={styles.container}>
      <div
        className={`${
          isSidebarActive
            ? `${styles.sidebar} ${styles.active}`
            : ` ${styles.sidebar}`
        } ${isSearchOverlayActive && styles.blur}`}
      >
        {/* LOGO CONTAINER START */}
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Image src={logoSrc} width={40} height={40} />
            </div>
            <div className={styles.logoText}>DwaveCode</div>
          </div>
          <div
            className={styles.toggleBtn}
            onClick={() => setIsSidebarActive(!isSidebarActive)}
          >
            <HiMenu />
          </div>
        </div>
        {/* LOGO CONTAINER END */}
        <ul className={styles.navList}>
          {sidebarData.map((item, index) => {
            if (!isSidebarActive) {
              return (
                <li
                  key={index}
                  onMouseEnter={(e) => handleMouseEnter(e, item.text)}
                  onMouseLeave={() => hideTooltip()}
                >
                  <Link href={item.link}>
                    <a
                      className={
                        router.pathname == item.link ? styles.active : ""
                      }
                    >
                      {item.icon}
                      <p>{item.text}</p>
                    </a>
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={index} onClick={() => setIsSidebarActive(false)}>
                  <Link href={item.link}>
                    <a
                      className={
                        router.pathname == item.link ? styles.active : ""
                      }
                    >
                      {item.icon}
                      <p>{item.text}</p>
                    </a>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div
        className={`${
          isSidebarActive
            ? `${styles.main}`
            : `${styles.main}  ${styles.active}`
        } ${isSearchOverlayActive && styles.blur}`}
      >
        {children}
      </div>
      <Tooltip />
      <SearchOverlay />
    </div>
  );
};

export default Layout;
