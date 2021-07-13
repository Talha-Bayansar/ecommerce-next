import {
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";
import { commerce } from "../../services/commerce";
import { useEffect } from "react";
import { useCommerce } from "../../contexts/useCommerce";
import Link from "next/link";

const AddressForm = () => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");
    const [token, setToken] = useState({});
    const methods = useForm();
    const { cart } = useCommerce();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({
        id: code,
        label: name,
    }));

    const subdivisions = Object.entries(shippingSubdivisions).map(
        ([code, name]) => ({
            id: code,
            label: name,
        })
    );

    const options = shippingOptions.map((option) => ({
        id: option.id,
        label: `${option.description} - (${option.price.formatted_with_symbol})`,
    }));

    const fetchShippingCountries = async () => {
        try {
            const token = await commerce.checkout.generateToken(cart.id, {
                type: "cart",
            });

            setToken(token);

            const { countries } =
                await commerce.services.localeListShippingCountries(token.id);

            setShippingCountries(countries);
            setShippingCountry(Object.keys(countries)[0]);
        } catch (error) {}
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(
            countryCode
        );
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (
        checkoutTokenId,
        country,
        region = null
    ) => {
        const options = await commerce.checkout.getShippingOptions(
            checkoutTokenId,
            { country, region }
        );
        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        fetchShippingCountries();
    }, []);

    useEffect(() => {
        shippingCountry && fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        shippingSubdivision &&
            fetchShippingOptions(
                token.id,
                shippingCountry,
                shippingSubdivision
            );
    }, [shippingSubdivision]);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <FormProvider {...methods}>
                <form onSubmit={() => console.log("submitted form")}>
                    <Grid container spacing={3}>
                        <FormInput name="firstName" label="First name" />
                        <FormInput name="lastName" label="Last name" />
                        <FormInput name="address1" label="Address" />
                        <FormInput name="email" label="Email" />
                        <FormInput name="city" label="City" />
                        <FormInput name="zip" label="ZIP / Postal code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select
                                value={shippingCountry}
                                fullWidth
                                onChange={(e) =>
                                    setShippingCountry(e.target.value)
                                }
                            >
                                {countries.map((country) => (
                                    <MenuItem
                                        key={country.id}
                                        value={country.id}
                                    >
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select
                                value={shippingSubdivision}
                                fullWidth
                                onChange={(e) =>
                                    setShippingSubdivision(e.target.value)
                                }
                            >
                                {subdivisions.map((subdivision) => (
                                    <MenuItem
                                        key={subdivision.id}
                                        value={subdivision.id}
                                    >
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select
                                value={shippingOption}
                                fullWidth
                                onChange={(e) =>
                                    setShippingOption(e.target.value)
                                }
                            >
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Link href="/shoppingCart">
                            <Button variant="outlined">Back to Cart</Button>
                        </Link>
                        <Button variant="contained">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;
