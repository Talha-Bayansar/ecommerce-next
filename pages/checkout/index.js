import { Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import AddressForm from "../../components/CheckoutForm/AddressForm";
import PaymentForm from "../../components/CheckoutForm/PaymentForm";
import useStyles from "./styles";

const steps = ["Shipping address", "Payment details"];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const classes = useStyles();

    const Confirmation = () => <div>Confirmation</div>;

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm checkoutToken={checkoutToken} />
        ) : (
            <PaymentForm />
        );

    return (
        <>
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
