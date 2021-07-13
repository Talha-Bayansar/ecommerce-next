import { Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import useStyles from "./styles";

const steps = ["Shipping address", "Payment details"];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();

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
                </Paper>
            </main>
        </>
    );
};

export default Checkout;
