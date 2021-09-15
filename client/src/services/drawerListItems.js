//Material UI Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import TimelineIcon from '@material-ui/icons/Timeline';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BusinessIcon from '@material-ui/icons/Business';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ViewListIcon from '@material-ui/icons/ViewList';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PaymentIcon from '@material-ui/icons/Payment';
import DescriptionIcon from '@material-ui/icons/Description';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ReceiptIcon from '@material-ui/icons/Receipt';

const getDistributorListItems = [
    {
        id: "Dashboard",
        title: "Dashboard",
        path: "http://localhost:3000/distributor/dashboard",
        icon: <DashboardIcon />
    },
    {
        id: "Sales Report",
        title: "Sales Report",
        path: "http://localhost:3000/sales-report",
        icon: <AssessmentIcon />
    },
    {
        id: "Sales Rep. Analytics",
        title: "Sales Rep. Analytics",
        path: "http://localhost:3000/sales-representative-analytics",
        icon: <TimelineIcon />
    },
];

const getHRListItems = [
    {
        id: "Dashboard",
        title: "Dashboard",
        path: "http://localhost:3000/human-resources/dashboard",
        icon: <DashboardIcon />
    },
    {
        id: "Manage Admin",
        title: "Manage Admin",
        path: "http://localhost:3000/human-resources/manage-admin",
        icon: <SupervisorAccountIcon />,
    },
    {
        id: "Manage Employee",
        title: "Manage Employee",
        path: "http://localhost:3000/human-resources/manage-employee",
        icon: <PeopleIcon />,
    }
];

const getManagerListItems = [
    {
        id: "Dashboard",
        title: "Dashboard",
        path: "http://localhost:3000/manager/dashboard",
        icon: <DashboardIcon />
    },
    {
        id: "Manage Suppliers",
        title: "Manage Suppliers",
        path: "http://localhost:3000/manager/manage-suppliers",
        icon: <BusinessIcon />,
    },
    {
        id: "Manage Products",
        title: "Manage Products",
        path: "http://localhost:3000/manager/manage-products",
        icon: <AssignmentIcon />,
    },
    {
        id: "Manage Customers",
        title: "Manage Customers",
        path: "http://localhost:3000/manager/manage-customers",
        icon: <PersonIcon />,
    },
    {
        id: "Order History",
        title: "Order History",
        path: "http://localhost:3000/manager/order-history",
        icon: <ViewListIcon />,
    },
    {
        id: "Sales Rep. Analytics",
        title: "Sales Rep. Analytics",
        path: "http://localhost:3000/sales-representative-analytics",
        icon: <TimelineIcon />
    },
];

const getPurchasingManagerListItems = [
    {
        id: "Dashboard",
        title: "Dashboard",
        path: "http://localhost:3000/purchasing-manager/dashboard",
        icon: <DashboardIcon />
    },
    {
        id: "Manage Products",
        title: "Manage Products",
        path: "http://localhost:3000/purchasing-manager/manage-product",
        icon: <AssignmentIcon />,
    },
    {
        id: "Manage Sales",
        title: "Manage Sales",
        path: "http://localhost:3000/purchasing-manager/manage-sales",
        icon: <ReceiptIcon />
    },
    {
        id: "Manage PO/Quotations",
        title: "Manage PO/Quotations",
        path: "http://localhost:3000/purchasing-manager/manage-po-quotation",
        icon: <ListAltIcon />
    },
    {
        id: "Supplier Payment",
        title: "Supplier Payment",
        path: "http://localhost:3000/purchasing-manager/supplier-payment",
        icon: <PaymentIcon />
    },
    {
        id: "Sales Rep. Analytics",
        title: "Sales Rep. Analytics",
        path: "http://localhost:3000/sales-representative-analytics",
        icon: <TimelineIcon />
    },
    {
        id: "Sales Trend Analytics",
        title: "Sales Trend Analytics",
        path: "http://localhost:3000/sales-trend-analytics",
        icon: <TrendingUpIcon />
    },
];

const getStoreKeeperListItems = [
    {
        id: "Dashboard",
        title: "Dashboard",
        path: "http://localhost:3000/store-keeper/dashboard",
        icon: <DashboardIcon />
    },
    {
        id: "GRN/GIN",
        title: "GRN/GIN",
        path: "http://localhost:3000/store-keeper/grn-gin",
        icon: <AssignmentIcon />,
    },
    {
        id: "Manage Products",
        title: "Manage Products",
        path: "http://localhost:3000/store-keeper/manage-products",
        icon: <AssignmentIcon />,
    },
];

const getSalesRepresentativeListItems = [
    {
        id: "Dashboard",
        title: "Dashboard",
        path: "http://localhost:3000/sales-representative/dashboard",
        icon: <DashboardIcon />
    },
    {
        id: "Manage Customers",
        title: "Manage Customers",
        path: "http://localhost:3000/sales-representative/manage-customers",
        icon: <PersonIcon />,
    },
    {
        id: "Sales and Invoice",
        title: "Sales and Invoice",
        path: "http://localhost:3000/sales-representative/sales-and-invoice",
        icon: <DescriptionIcon />,
    },
    {
        id: "Personal Order History",
        title: "Personal Order History",
        path: "http://localhost:3000/sales-representative/personal-order-history",
        icon: <ViewListIcon />,
    },
    {
        id: "Sales Rep. Analytics",
        title: "Sales Rep. Analytics",
        path: "http://localhost:3000/sales-representative-analytics",
        icon: <TimelineIcon />
    },

];

export function drawerListItems(role) {
    if (role === "Distributor") {
        return (getDistributorListItems)
    }
    if (role === "HR" ) {
        return (getHRListItems)
    }
    if (role === "Manager" ) {
        return (getManagerListItems)
    }
    if (role === "Purchasing Manager" ) {
        return (getPurchasingManagerListItems)
    }
    if (role === "Store Keeper" ) {
        return (getStoreKeeperListItems)
    }
    if (role === "Sales Representative" ) {
        return (getSalesRepresentativeListItems)
    }
}