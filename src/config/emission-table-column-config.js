const defaultEmissionsColumns = [{
    columnKey: 'fuel_id',
    columnId: 'fuel',
    columnHeader: 'Fuel',
}, {
    columnKey: 'amount',
    columnId: 'amount',
    columnHeader: 'Amount',
}, {
    columnKey: 'co2',
    columnId: 'co2',
    columnHeader: 'CO2(tonnes)',
}, {
    columnKey: 'ch4',
    columnId: 'ch4',
    columnHeader: 'CH4(tonnes)',
}, {
    columnKey: 'n2o',
    columnId: 'n2o',
    columnHeader: 'N2O(tonnes)',
}, {
    columnKey: 'co2e',
    columnId: 'co2e',
    columnHeader: 'CO2e(tonnes)',
}, {
    columnKey: 'biofuel',
    columnId: 'biofuel',
    columnHeader: 'BioFuel CO2(tonnes)',
}, {
    columnKey: 'ef',
    columnId: 'ef',
    columnHeader: 'EF (kgCO2e/unit)',
}, {
    columnKey: 'action',
    columnId: 'action',
    columnHeader: '',
}]

const purchased_electricity = [{
    columnKey: 'year',
    columnId: 'year',
    columnHeader: 'Year',
}, {
    columnKey: 'facility',
    columnId: 'facility',
    columnHeader: 'Facility',
}, {
    columnKey: 'amount',
    columnId: 'amount',
    columnHeader: 'Amount',
}, {
    columnKey: 'unit',
    columnId: 'unit',
    columnHeader: 'Units',
}, {
    columnKey: 'calculation_approach',
    columnId: 'calculation_approach',
    columnHeader: 'Calculation Approach',
}, {
    columnKey: 'type_of_emission_factors',
    columnId: 'type_of_emission_factors',
    columnHeader: 'Types of Emission Factor',
}, {
    columnKey: 'co2',
    columnId: 'co2',
    columnHeader: 'CO2(tonnes)',
}, {
    columnKey: 'ch4',
    columnId: 'ch4',
    columnHeader: 'CH4(tonnes)',
}, {
    columnKey: 'n2o',
    columnId: 'n2o',
    columnHeader: 'N2O(tonnes)',
}, {
    columnKey: 'co2e',
    columnId: 'co2e',
    columnHeader: 'CO2e(tonnes)',
}, {
    columnKey: 'ef',
    columnId: 'ef',
    columnHeader: 'EF (kgCO2e/unit)',
}, {
    columnKey: 'action',
    columnId: 'action',
    columnHeader: '',
}]

export const getEmissionsColumnConfig = (emissionType) => {
    if(emissionType === 'purchased_electricity') {
        return purchased_electricity;
    } else return defaultEmissionsColumns
}