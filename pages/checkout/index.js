import {
    Button,
    CircularProgress,
    CssBaseline,
    Divider,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import AddressForm from "../../components/CheckoutForm/AddressForm";
import PaymentForm from "../../components/CheckoutForm/PaymentForm";
import useStyles from "./styles";
import { commerce } from "../../services/commerce";
import Link from "next/link";
import { useCommerce } from "../../contexts/useCommerce";
import { useRouter } from "next/dist/client/router";

const steps = ["Shipping address", "Payment details"];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const { order, error, cart, setToken } = useCommerce();
    const router = useRouter();
    const classes = useStyles();

    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const backStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const next = (data) => {
        setShippingData(data);
        nextStep();
    };

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {
                    type: "cart",
                });

                setToken(token);
            } catch (error) {
                router.push("/");
            }
        };
        generateToken();
    }, []);

    const Confirmation = () =>
        order.customer ? (
            <>
                <div>
                    <Typography variant="h5">
                        Thank you for your purchase, {order.customer.firstname}{" "}
                        {order.customer.lastname}
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="subtitle2">
                        Order ref: {order.customer_reference}
                    </Typography>
                </div>
                <br />
                <Link href="/">
                    <Button variant="outlined" type="button">
                        Back to Home
                    </Button>
                </Link>
            </>
        ) : (
            <div className={classes.spinner}>
                <CircularProgress />
            </div>
        );

    if (error) {
        return (
            <>
                <Typography variant="h5">Error: {error}</Typography>
                <br />
                <Link href="/">
                    <Button variant="outlined" type="button">
                        Back to Home
                    </Button>
                </Link>
            </>
        );
    }

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm next={next} />
        ) : (
            <PaymentForm
                shippingData={shippingData}
                backStep={backStep}
                nextStep={nextStep}
            />
        );

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : <Form />}
                </Paper>
            </main>
        </>
    );
};

export default Checkout;
