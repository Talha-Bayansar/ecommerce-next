import { Grid, TextField } from "@material-ui/core";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label }) => {
    const { control } = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                render={({ field }) => (
                    <TextField {...field} fullWidth label={label} required />
                )}
                defaultValue=""
                control={control}
                name={name}
            />
        </Grid>
    );
};

export default FormInput;
