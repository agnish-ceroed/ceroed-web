import React from 'react';
import { Card, CardContent, Typography } from "@mui/material"

import CeroInfoPair from '../../../../components/CeroInfoPair';
import useStyles from './styles'

const StatisticsCard = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes[`colors${props.index}`]}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                {props.attributes.map(attribute => <CeroInfoPair title={attribute.name} value={attribute.value} />)}
            </CardContent>
        </Card>
    )
}

export default StatisticsCard;
