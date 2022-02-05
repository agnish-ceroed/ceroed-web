import { Container } from "@mui/material";

import DashboardLayout from '../../layouts/DashboardLayout'
import EmissionTable from "./EmissionTable";
import EmissionHeader from "./EmissionHeader";
import useStyles from "./styles";

const savedPage = { // To be used from the api response
    pageNumber: 1,
};

const DEFAULT_ITEMS_PER_PAGE = 20;

const EmissionList = () => {
    const classes = useStyles();
    const emissonData = [{
        fuel: 'CNC',
        count: 10,
        co2: '0.05',
        ch4: '',
        n2o: '',
        co2e: '',
        bioFuel: '',
        ef: '',
    }, {
        fuel: 'CNC',
        count: 10,
        co2: '0.05',
        ch4: '0.045',
        n2o: '0.54',
        co2e: '0.01',
        bioFuel: '0.43',
        ef: '1.006',
    }];

    const onLoadMore = (pageSize = DEFAULT_ITEMS_PER_PAGE, pageNumber) => {
        const filter = {
            emissionFilter: {},
            page: {
                pageSize,
                pageNumber: pageNumber || (savedPage.pageNumber || 0) + 1,
            }
        };
        // api call with filter
    };

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <EmissionHeader />
                <EmissionTable emissionData={emissonData} onLoadMore={onLoadMore} />
            </Container>
        </DashboardLayout>
    );
};

export default EmissionList;