import React from 'react'
import { Grid, Typography, Container, TextField } from '@material-ui/core'

function Field({fieldName, value}){
    return(
        <Grid item xs={12} style={{height: 80}}>
            <Typography color="textSecondary" variant="h6">{fieldName}:</Typography>
            <TextField fullWidth autoComplete={false}>

            </TextField>
        </Grid>
    )
}

export default function EditableFields({user}){
    return(
        <Container >
            <br />
            <Grid spacing={2} container justifyContent="flex-start">
                <Field 
                    fieldName="Username"
                    value={user.username}
                />
            </Grid>
            <Grid spacing={2} container justifyContent="flex-start">
                <Field 
                    fieldName="First Name"
                    value={user.first_name}
                />
            </Grid>
            <Grid spacing={2} container justifyContent="flex-start">
                <Field 
                    fieldName="Last Name"
                    value={user.last_name}
                />
            </Grid>
            <Grid spacing={2} container justifyContent="flex-start">
                <Field 
                    fieldName="E-mail"
                    value={user.email}
                />
            </Grid>
            <Grid spacing={2} container justifyContent="flex-start">
                <Field 
                    fieldName="Country"
                    value={user.country}
                />
            </Grid>
            <Grid spacing={2} container justifyContent="flex-start">
                <Field 
                    fieldName="State"
                    value={user.country}
                />
            </Grid>
            <Grid spacing={2} container justifyContent="flex-start">
                <Field 
                    fieldName="City"
                    value={user.city}
                />
            </Grid>
        </Container>

    )
}