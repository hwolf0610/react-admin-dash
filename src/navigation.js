
import calendar from "./assets/img/sidebar/svg/calendar.svg";
import trophy from "./assets/img/sidebar/svg/trophy.svg";
import card from "./assets/img/sidebar/svg/card.svg";
import user from "./assets/img/sidebar/svg/user.svg";
import settings from "./assets/img/sidebar/svg/settings.svg";
import logout from "./assets/img/sidebar/logout.png";
import bolt from "./assets/img/sidebar/bolt.png";

export default [
  {
    id: 1,
    name: "Brand",
    to: "",
    icon: bolt,
    iconBackdrop: false

  },
  {
    id: 2,
    isActive: true,
    isHover: false,
    name: "Plans",
    to: "/programs/Plans",
    icon: calendar,
    svgContent: {
      width: '16px',
      height: '16px',
      xmlns: "http://www.w3.org/2000/svg",
      fill: 'none',
      viewBox: '0 0 16 16',
      path: {
        d: "M15 2H13V0H11V2H9V0H7V2H5V0H3V2H1C0.447 2 0 2.447 0 3V15C0 15.553 0.447 16 1 16H15C15.553 16 16 15.553 16 15V3C16 2.447 15.553 2 15 2ZM14 14H2V6H14V14Z",
       fill: "#1aa0ff"
      },
      path2: null
    },
    iconBackdrop: true

  },
  {
    id: 3,
    isActive: false,
    isHover: false,
    name: "Challenges",
    to: "/Challenges",
    icon: trophy,
    iconBackdrop: true,
    svgContent: {
      width: '16px',
      height: '16px',
      fill: 'none',
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: '0 0 16 16',
      path: {
        d: "M0 0V4C0 6.06548 1.60369 8 4.14142 8C4.48578 9.32947 5.49066 10.3786 6.79016 10.7935C6.612 11.7306 6.28198 12.9044 5.66724 14H4V16H12V14H10.3328C9.71802 12.9044 9.388 11.7306 9.20984 10.7935C10.5093 10.3786 11.5142 9.32947 11.8586 8C14.3879 8 16 6.07178 16 4V0H0ZM2 4V2H4V6C2.89746 6 2 5.10303 2 4ZM14 4C14 5.10303 13.1025 6 12 6V2H14V4ZM0 0V4C0 6.06548 1.60369 8 4.14142 8C4.48578 9.32947 5.49066 10.3786 6.79016 10.7935C6.612 11.7306 6.28198 12.9044 5.66724 14H4V16H12V14H10.3328C9.71802 12.9044 9.388 11.7306 9.20984 10.7935C10.5093 10.3786 11.5142 9.32947 11.8586 8C14.3879 8 16 6.07178 16 4V0H0ZM2 4V2H4V6C2.89746 6 2 5.10303 2 4ZM14 4C14 5.10303 13.1025 6 12 6V2H14V4Z",
       fill: "white"
      },
      path2: null
    },
  },
  {
    id: 4,
    isActive: false,
    isHover: false,
    name: "Card Database",
    to: "/CardLibrarys",
    svgContent: {
      width: '16px',
      height: '16px',
      fill: 'none',
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: '0 0 16 16',
      path: {
        d: "M9 0H1C0.447715 0 0 0.447715 0 1V11C0 11.5523 0.447715 12 1 12H9C9.55229 12 10 11.5523 10 11V1C10 0.447715 9.55229 0 9 0Z",
       fill: "white"
      },
      path2: {
        d: "M15.1234 4.08496L12.1234 3.70996L11.8754 5.69396L13.8824 5.94496L12.8874 13.883L5.94136 13.012L5.69336 15L13.6314 16C13.6728 16.0051 13.7146 16.0077 13.7564 16.008C14.0001 16.0079 14.2353 15.9188 14.418 15.7575C14.6007 15.5962 14.7181 15.3738 14.7484 15.132L15.9914 5.19996C16.0242 4.93688 15.9512 4.67154 15.7884 4.46226C15.6256 4.25299 15.3864 4.11692 15.1234 4.08396V4.08496Z",
        fill: "white"
      }
    },
    icon: card,
    iconBackdrop: true
  },
  {
    id: 5,
    isActive: false,
    isHover: false,
    name: "Users",
    to: "/users",
    icon: user,
    svgContent: {
      width: '16px',
      height: '16px',
      fill: 'none',
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: '0 0 16 16',
      path: {
        d: "M12.25 8.23096C11.163 9.32296 9.659 9.99996 8 9.99996C6.341 9.99996 4.837 9.32296 3.75 8.23096C1.5 9.64596 0 12.145 0 15V16H16V15C16 12.145 14.5 9.64596 12.25 8.23096Z",
       fill: "white"
      },
      path2: {
        d: "M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z",
        fill: "white"
      }
    },
    iconBackdrop: true

  },
  {
    id: 6,
    isActive: false,
    isHover: false,
    name: "Settings",
    to: "/settings",
    icon: settings,
    svgContent: {
      width: '16px',
      height: '16px',
      xmlns: "http://www.w3.org/2000/svg",
      fill: 'none',
      viewBox: '0 0 16 16',
      path: {
        d: "M15.135 6.784C13.832 6.458 13.214 4.966 13.905 3.815C14.227 3.279 14.13 2.817 13.811 2.499L13.501 2.189C13.183 1.871 12.721 1.774 12.185 2.095C11.033 2.786 9.541 2.168 9.216 0.865C9.065 0.258 8.669 0 8.219 0H7.781C7.331 0 6.936 0.258 6.784 0.865C6.458 2.168 4.966 2.786 3.815 2.095C3.279 1.773 2.816 1.87 2.498 2.188L2.188 2.498C1.87 2.816 1.773 3.279 2.095 3.815C2.786 4.967 2.168 6.459 0.865 6.784C0.26 6.935 0 7.33 0 7.781V8.219C0 8.669 0.258 9.064 0.865 9.216C2.168 9.542 2.786 11.034 2.095 12.185C1.773 12.721 1.87 13.183 2.189 13.501L2.499 13.811C2.818 14.13 3.281 14.226 3.815 13.905C4.967 13.214 6.459 13.832 6.784 15.135C6.935 15.742 7.331 16 7.781 16H8.219C8.669 16 9.064 15.742 9.216 15.135C9.542 13.832 11.034 13.214 12.185 13.905C12.72 14.226 13.182 14.13 13.501 13.811L13.811 13.501C14.129 13.183 14.226 12.721 13.905 12.185C13.214 11.033 13.832 9.541 15.135 9.216C15.742 9.065 16 8.669 16 8.219V7.781C16 7.33 15.74 6.935 15.135 6.784ZM8 11C6.343 11 5 9.657 5 8C5 6.343 6.343 5 8 5C9.657 5 11 6.343 11 8C11 9.657 9.657 11 8 11Z",
       fill: "white"
      },
      path2: null
    },
    iconBackdrop: true

  },
  {
    id: 7,
    name: "Logout",
    to: "/logout",
    icon: logout,
    iconBackdrop: false
  },
];
