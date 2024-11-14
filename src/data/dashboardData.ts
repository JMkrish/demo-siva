import {
  FaGraduationCap,
  FaUserFriends,
  FaBuilding,
  FaDesktop,
  FaMedal,
  FaFileAlt,
  FaClipboardList,
  FaHammer,
  FaChartBar,
  FaCreditCard,
} from "react-icons/fa";

export interface DashboardTile {
  icon: any;
  title: string;
  description: string;
  link: string;
  helpLink: string;
}

export const dashboardTiles: DashboardTile[] = [
  {
    icon: FaGraduationCap,
    title: "Training Courses",
    description: "View accredited training course schedules. Request to attend training here or contact the training provider directly.",
    link: "courses",
    helpLink: "courses-help",
  },
  {
    icon: FaGraduationCap,
    title: "Schedule and Update Exams",
    description: "Schedule and update exams.",
    link: "exams",
    helpLink: "exams-help",
  },
  {
    icon: FaUserFriends,
    title: "Manage Employees",
    description: "Add and remove employees. Link employees to their employer in the database.",
    link: "#",
    helpLink: "#",
  },
  {
    icon: FaBuilding,
    title: "Manage Locations",
    description: "Add and remove locations that are in addition to your Street Address in the Business Profile.",
    link: "#",
    helpLink: "#",
  },
  {
    icon: FaDesktop,
    title: "Manage Classes",
    description: "Add and remove training classes, update rosters and training cards.",
    link: "#",
    helpLink: "#",
  },
  {
    icon: FaMedal,
    title: "Apply for Accreditation",
    description: "Apply for a Maryland Lead Paint Abatement Service Accreditation.",
    link: "#",
    helpLink: "#",
  },
  {
    icon: FaFileAlt,
    title: "My Applications",
    description: "View, edit and submit applications that have been created.",
    link: "#",
    helpLink: "#",
  },
  {
    icon: FaMedal,
    title: "My Accreditations",
    description: "View Maryland Lead Paint Abatement Service Accreditation Certificates.",
    link: "#",
    helpLink: "#",
  },
  {
    icon: FaClipboardList,
    title: "Inspections and Certifications",
    description: "Schedule inspections. Create Maryland Lead Paint Inspection Certificates.",
    link: "#",
    helpLink: "#",
  },
  {
    icon: FaHammer,
    title: "Enforcement",
    description: "Create and manage children, referrals, cases, actions, inspections.",
    link: "#",
    helpLink: "#",
  },
  {
    icon: FaChartBar,
    title: "Reports",
    description: "Run reports for Accreditation, Inspections, Enforcement and audits.",
    link: "#",
    helpLink: "#",
  },
  {
    icon: FaCreditCard,
    title: "Payments",
    description: "View and submit payments for Enforcement Cases, Lead Free Certificates.",
    link: "#",
    helpLink: "#",
  },
]; 