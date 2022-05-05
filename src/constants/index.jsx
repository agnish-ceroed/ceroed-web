export const months = [
    {
        id: 'january',
        value: 'January',
        key: 1,
    },
    {
        id: 'february',
        value: 'February',
        key: 2,
    },
    {
        id: 'march',
        value: 'March',
        key: 3,
    },
    {
        id: 'april',
        value: 'April',
        key: 4,
    },
    {
        id: 'may',
        value: 'May',
        key: 5,
    },
    {
        id: 'june',
        value: 'June',
        key: 6,
    },
    {
        id: 'july',
        value: 'July',
        key: 7,
    },
    {
        id: 'august',
        value: 'August',
        key: 8,
    },
    {
        id: 'september',
        value: 'September',
        key: 9,
    },
    {
        id: 'october',
        value: 'October',
        key: 10,
    },
    {
        id: 'november',
        value: 'November',
        key: 11,
    },
    {
        id: 'december',
        value: 'December',
        key: 12,
    },
];

export const sampleYear = [
    {
        key: 2022,
        value: '2022'
    },
    {
        key: 2021,
        value: '2021'
    },
    {
        key: 2020,
        value: '2020'
    },
    {
        key: 2019,
        value: '2019'
    },
    {
        key: 2018,
        value: '2018'
    },
    {
        key: 2017,
        value: '2017'
    },
    {
        key: 2016,
        value: '2016'
    },
    {
        key: 2015,
        value: '2015'
    },
    
];

export const sampleFilterType = [
    {
        key: 'type1',
        value: 'Type 1'
    },
    {
        key: 'type2',
        value: 'Type 2'
    },
    {
        key: 'type3',
        value: 'Type 3'
    },
];

export const sampleFacility = [
    {
        key: 'Facility1',
        value: 'Facility 1'
    },
    {
        key: 'Facility2',
        value: 'Facility 2'
    },
]

export const sampleCountryList = [
    {
        key: 'Afghanistan',
        value: 'Afghanistan'
    },
    {
        key: 'India',
        value: 'india'
    }
]

export const emissionTypes = [
    {
        id: 'stationary_combustion',
        title: 'Stationary combustion',
    }, {
        id: 'mobile_combustion',
        title: 'Mobile combustion',
    }, {
        id: 'refrigerants',
        title: 'Refrigerants',
    }, {
        id: 'transportation',
        title: 'Transportation',
    }, {
        id: 'water',
        title: 'Water',
    }, {
        id: 'waste',
        title: 'Waste',
    }, {
        id: 'purchased_electricity',
        title: 'Purchased Electricity',
    },
    {
        id: 'water_consumption',
        title: 'Water consumption',
    },
    {
        id: 'water_discharge',
        title: 'Water discharge',
    },
]

export const emissionTypeData = [
    {
        id: 'environmental',
        title: 'Environmental',
        subItems: [
            {
                id: 'energy_and_materials',
                title: 'Energy and Materials',
                subItems: [
                    {
                        id: 'stationary_combustion',
                        title: 'Stationary combustion',
                    }, {
                        id: 'mobile_combustion',
                        title: 'Mobile combustion',
                    }, {
                        id: 'refrigerants',
                        title: 'Refrigerants',
                    }, {
                        id: 'transportation',
                        title: 'Transportation',
                    }, {
                        id: 'purchased_electricity',
                        title: 'Purchased electricity',
                    },
                ]
            }, {
                id: 'water',
                title: 'Water',
                subItems: [
                    {
                        id: 'water_consumption',
                        title: 'Water consumption',
                    },
                    {
                        id: 'water_discharge',
                        title: 'Water discharge',
                    },
                ]
            }, {
                id: 'waste',
                title: 'Waste',
                subItems: [
                    {
                        id: 'waste',
                        title: 'Waste',
                    },
                ]
            },
        ]
    }, {
        id: 'social',
        title: 'Social',
        subItems: [

        ]
    }, {
        id: 'governance',
        title: 'Governance',
        subItems: [

        ]
    }
];

export const selectionPeriod = [
    {
        key: 'last_one_month',
        value: "Last one month"
    }, {
        key: 'last_six_months',
        value: "Last six months"
    }, {
        key: 'last_one_year',
        value: "Last one year"
    }, {
        key: 'last_five_years',
        value: "Last five years"
    }, {
        key: 'advanced',
        value: "Advanced"
    },
]

export const userRoles = [{
    key: 'admin',
    value: 'Business Admin'
}, {
    key: 'facilitator',
    value: 'Business Facility Manager'
}, {
    key: 'sustainability_manager',
    value: 'Business Sustainability Manager',
}, {
    key: 'auditor',
    value: 'Business Approver',
}]