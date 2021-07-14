import React, { useState } from 'react'
import { ListItem, ListItemIcon, SvgIcon ,TextField, Grid } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';

export default function ProfileField({label, value, onChange}){
    
    const [disabled, setDisabled] = useState(true)

    return(
        <Grid container style={{marginBottom: 20}}>
            <Grid item xs={11}>
                <TextField
                    size="small"
                    fullWidth
                    disabled={disabled}
                    label={label}
                    value={value}
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e)=>onChange(e)}
                />
            </Grid>
            <Grid item xs={1}>
                <ListItem
                    style={{maxWidth: 60}}
                    button 
                    onClick={()=> setDisabled(!disabled)}
                >
                    <ListItemIcon >
                        <EditIcon />
                    </ListItemIcon>
                </ListItem>
            </Grid>
        </Grid>
    )
        
}

