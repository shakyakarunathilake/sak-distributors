//Material UI Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
// import AssessmentIcon from '@material-ui/icons/Assessment';
import TimelineIcon from '@material-ui/icons/Timeline';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BusinessIcon from '@material-ui/icons/Business';
// import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PaymentIcon from '@material-ui/icons/Payment';
import DescriptionIcon from '@material-ui/icons/Description';
// import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import StoreIcon from '@mui/icons-material/Store';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import RouteIcon from '@mui/icons-material/Route';

const getAnalyticListItems = [
    {
        id: "Sales Analytics",
        title: "Sales Analytics",
        path: "/sales-analytics",
        icon: <TimelineIcon />
    },
]

const getDistributorListItems = [
    {
        id: "Dashboard",
        title: "Dashboard",
        path: "/distributor/dashboard",
        icon: <DashboardIcon />
    },
    {
        id: "Manage Employee",
        title: "Manage Employee",
        path: "/distributor/manage-employee",
        icon: <PeopleIcon />,
    },
    {
        id: "Manage Purchase Order",
        title: "Manage Purchase Order",
        path: "/distributor/manage-purchase-orders",
        icon: <ListAltIcon />
    },
];

const getHRListItems = [
    {
        id: "Dashboard",
        title: "Dashboard",
        path: "/human-resources/dashboard",
        icon: <DashboardIcon />
    },
    // {
    //     id: "Manage Admin",
    //     title: "Manage Admin",
    //     path: "/human-resources/manage-admin",
    //     icon: <SupervisorAccountIcon />,
    // },
    {
        id: "Manage Employee",
        title: "Manage Employee",
        path: "/human-resources/manage-employee",
        icon: <PeopleIcon />,
    }
];

const getManagerListItems = [
    {
        id: "Dashboard",
        title: "Dashboard",
        path: "/manager/dashboard",
        icon: <DashboardIcon />
    },
    {
        id: "Manage Suppliers",
        title: "Manage Suppliers",
        path: "/manager/manage-suppliers",
        icon: <BusinessIcon />,
    },
    {
        id: "Manage Products",
        title: "Manage Products",
        path: "/manager/manage-products",
        icon: <AssignmentIcon />,
    },
    {
        id: "Manage Customers",
        title: "Manage Customers",
        path: "/manager/manage-customers",
        icon: <PersonIcon />,
    },
    {
        id: "Manage Vehicles",
        title: "Manage Vehicles",
        path: "/manager/manage-vehicles",
        icon: <DirectionsBusIcon />,
    },
    {
        id: "Manage Routes",
        title: "Manage Routes",
        path: "/manager/manage-routes",
        icon: <RouteIcon />,
    },
    {
        id: "Sales and Invoice",
        title: "Sales and Invoice",
        path: "/manager/sales-and-invoice",
        icon: <DescriptionIcon />,
    },

];

const getPurchasingManagerListItems = [
    {
        id: "Dashboard",
        title: "Dashboard",
        path: "/purchasing-manager/dashboard",
        icon: <DashboardIcon />
    },
    {
        id: "Manage Products",
        title: "Manage Products",
        path: "/purchasing-manager/manage-products",
        icon: <AssignmentIcon />,
    },
    {
        id: "Manage Purchase Order",
        title: "Manage Purchase Order",
        path: "/purchasing-manager/manage-purchase-orders",
        icon: <ListAltIcon />
    },
    {
        id: "Manage Quotations",
        title: "Manage Quotations",
        path: "/purchasing-manager/manage-quotations",
        icon: <ListAltIcon />
    },
    {
        id: "Manage Supplier Payment",
        title: "Manage Supplier Payment",
        path: "/purchasing-manager/manage-supplier-payment",
        icon: <PaymentIcon />
    },
];

const getStoreKeeperListItems = [
    {
        id: "Dashboard",
        title: "Dashboard",
        path: "/store-keeper/dashboard",
        icon: <DashboardIcon />
    },
    {
        id: "Manage Store",
        title: "Manage Store",
        path: "/store-keeper/manage-store",
        icon: <StoreIcon />,
    },
    {
        id: "Manage GRN",
        title: "Manage GRN",
        path: "/store-keeper/manage-grn",
        icon: <InsertDriveFileIcon />,
    },
    {
        id: "Manage GIN",
        title: "Manage GIN",
        path: "/store-keeper/manage-gin",
        icon: <InsertDriveFileIcon />,
    },
    {
        id: "Manage Products",
        title: "Manage Products",
        path: "/store-keeper/manage-products",
        icon: <AssignmentIcon />,
    },
];

const getSalesRepresentativeListItems = [
    {
        id: "Dashboard",
        title: "Dashboard",
        path: "/sales-representative/dashboard",
        icon: <DashboardIcon />
    },
    {
        id: "Manage Customers",
        title: "Manage Customers",
        path: "/sales-representative/manage-customers",
        icon: <PersonIcon />,
    },
    {
        id: "Sales and Invoice",
        title: "Sales and Invoice",
        path: "/sales-representative/sales-and-invoice",
        icon: <DescriptionIcon />,
    },
];

const getDeliveryRepresentativeListItems = [
    {
        id: "Dashboard",
        title: "Dashboard",
        path: "/delivery-representative/dashboard",
        icon: <DashboardIcon />
    },
    {
        id: "Manage Customers",
        title: "Manage Customers",
        path: "/delivery-representative/manage-customers",
        icon: <PersonIcon />,
    },
    {
        id: "Manage GIN",
        title: "Manage GIN",
        path: "/delivery-representative/manage-gin",
        icon: <InsertDriveFileIcon />,
    },
    {
        id: "Sales and Invoice",
        title: "Sales and Invoice",
        path: "/delivery-representative/sales-and-invoice",
        icon: <DescriptionIcon />,
    },

];

export function drawerListItems(designation) {
    if (designation === "Distributor") {
        return (getDistributorListItems)
    }
    if (designation === "Human Resources") {
        return (getHRListItems)
    }
    if (designation === "Manager") {
        return (getManagerListItems)
    }
    if (designation === "Purchasing Manager") {
        return (getPurchasingManagerListItems)
    }
    if (designation === "Store Keeper") {
        return (getStoreKeeperListItems)
    }
    if (designation === "Sales Representative") {
        return (getSalesRepresentativeListItems)
    }
    if (designation === "Delivery Representative") {
        return (getDeliveryRepresentativeListItems)
    }
}

export function analyticListItems(analyticprivileges) {
    if (analyticprivileges) {
        return (getAnalyticListItems)
    } else {
        return []
    }
}