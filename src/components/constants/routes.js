import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from "@material-ui/icons/List";

export const routingData = {
  realtor: [
    {
      title: "Search orders",
      icon: SearchIcon,
      to: "/dashboard/client_orders"
    },
    {
      title: "Edit my info",
      icon: EditIcon,
      to: "/dashboard/realtor_profile/edit"
    },
    {
      title: "View responded",
      icon: CheckBoxIcon,
      to: "/dashboard/responded_orders"
    }
  ],
  client: [
    {
      title: "Fill out the form",
      icon: FormatIndentIncreaseIcon,
      to: "/dashboard/order"
    },
    { title: "Search an agent", icon: SearchIcon, to: "/dashboard/realtors" },
    {
      title: "Show my orders",
      icon: ListIcon,
      to: "/dashboard/orders"
    }
  ]
};
