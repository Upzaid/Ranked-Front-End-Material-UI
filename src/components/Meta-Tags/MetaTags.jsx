import React from 'react'
import { Helmet } from 'react-helmet'

export default function MetaTags({title, descirption}){
    return(
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={descirption} />
        </Helmet>
    )
}