import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    title: {
        marginTop: "5%",
    },
    emptyButton: {
        minWidth: "150px",
        [theme.breakpoints.down("xs")]: {
            marginBottom: "5px",
        },
        [theme.breakpoints.up("xs")]: {
            marginRight: "20px",
        },
    },
    checkoutButton: {
        minWidth: "150px",
    },
    link: {
        color: "blue",
        cursor: "pointer",
    },
    cardDetails: {
        display: "flex",
        marginTop: "10%",
        width: "100%",
        justifyContent: "space-between",
    },
    progressIndicator: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
}));
