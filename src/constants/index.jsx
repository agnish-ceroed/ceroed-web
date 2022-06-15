export const months = [
  {
    id: "january",
    value: "January",
    key: 1,
  },
  {
    id: "february",
    value: "February",
    key: 2,
  },
  {
    id: "march",
    value: "March",
    key: 3,
  },
  {
    id: "april",
    value: "April",
    key: 4,
  },
  {
    id: "may",
    value: "May",
    key: 5,
  },
  {
    id: "june",
    value: "June",
    key: 6,
  },
  {
    id: "july",
    value: "July",
    key: 7,
  },
  {
    id: "august",
    value: "August",
    key: 8,
  },
  {
    id: "september",
    value: "September",
    key: 9,
  },
  {
    id: "october",
    value: "October",
    key: 10,
  },
  {
    id: "november",
    value: "November",
    key: 11,
  },
  {
    id: "december",
    value: "December",
    key: 12,
  },
];

export const sampleYear = [
  {
    key: 2022,
    value: "2022",
  },
  {
    key: 2021,
    value: "2021",
  },
  {
    key: 2020,
    value: "2020",
  },
  {
    key: 2019,
    value: "2019",
  },
  {
    key: 2018,
    value: "2018",
  },
  {
    key: 2017,
    value: "2017",
  },
  {
    key: 2016,
    value: "2016",
  },
  {
    key: 2015,
    value: "2015",
  },
];

export const sampleFilterType = [
  {
    key: "type1",
    value: "Type 1",
  },
  {
    key: "type2",
    value: "Type 2",
  },
  {
    key: "type3",
    value: "Type 3",
  },
];

export const sampleFacility = [
  {
    key: "Facility1",
    value: "Facility 1",
  },
  {
    key: "Facility2",
    value: "Facility 2",
  },
];

export const sampleCountryList = [
  {
    key: "Afghanistan",
    value: "Afghanistan",
  },
  {
    key: "India",
    value: "india",
  },
];

export const emissionTypes = [
  {
    id: "stationary_combustion",
    title: "Stationary combustion",
  },
  {
    id: "mobile_combustion",
    title: "Mobile combustion",
  },
  {
    id: "refrigerants",
    title: "Refrigerants",
  },
  {
    id: "transportation",
    title: "Transportation",
  },
  {
    id: "water",
    title: "Water",
  },
  {
    id: "waste",
    title: "Waste",
  },
  {
    id: "purchased_electricity",
    title: "Purchased Electricity",
  },
  {
    id: "water_consumption",
    title: "Water consumption",
  },
  {
    id: "water_discharge",
    title: "Water discharge",
  },
  {
    id: "employees_turnover",
    title: "Employees & Turnover",
  },  {
    id: "development_training",
    title: "Development & Training",
  },
  {
    id: "employee_health_safety_incident_record",
    title: "Employee Health & Safety incident record",
  },  {
    id: "worker_safety_training_procedures",
    title: "Worker safety training and procedures",
  },
  {
    id: "age_based_statistics",
    title: "Age-based statistics",
  },  {
    id: "gender_based_statistics",
    title: "Gender-based statistics",
  },  {
    id: "discrimination_incident_record",
    title: "Discrimination incident record",
  },
  {
    id: "supplier_screening",
    title: "Supplier screening",
  }, {
    id: "social_engagement_human_rights_training",
    title: "Human Rights training",
  },
  {
    id: "social_engagement_human_rights_training",
    title: "Human Rights training",
  }, {
    id: "local_communities",
    title: "Local communities",
  }, {
    id: "political_contributions",
    title: "Political contributions",
  },
  {
    id: "anti_corruption_disclosure",
    title: "Anti-corruption disclosure",
  }, {
    id: "anti_corruption_training",
    title: "Anti-corruption training",
  }, {
    id: "anti_competitive_disclosure",
    title: "Anti-competitive disclosure",
  },
  {
    id: "direct_economic_impact",
    title: "Direct economic impact",
  }, {
    id: "indirect_economic_impact",
    title: "Indirect economic impact",
  }, {
    id: "subsidies_financial_assistance",
    title: "Subsidies and Financial Assistance",
  }, {
    id: "tax",
    title: "Tax",
  }
];

export const emissionTypeData = [
  {
    id: "environmental",
    title: "Environmental",
    subItems: [
      {
        id: "energy_and_materials",
        title: "Energy and Materials",
        subItems: [
          {
            id: "stationary_combustion",
            title: "Stationary combustion",
          },
          {
            id: "mobile_combustion",
            title: "Mobile combustion",
          },
          {
            id: "refrigerants",
            title: "Refrigerants",
          },
          {
            id: "transportation",
            title: "Transportation",
          },
          {
            id: "purchased_electricity",
            title: "Purchased electricity",
          },
        ],
      },
      {
        id: "water",
        title: "Water",
        subItems: [
          {
            id: "water_consumption",
            title: "Water consumption",
          },
          {
            id: "water_discharge",
            title: "Water discharge",
          },
        ],
      },
      {
        id: "waste",
        title: "Waste",
        subItems: [
          {
            id: "waste",
            title: "Waste",
          },
        ],
      },
    ],
  },
  {
    id: "social",
    title: "Social",
    subItems: [{
      id: "employment",
      title: "Employment",
      subItems: [
        {
          id: "employees_turnover",
          title: "Employees & Turnover",
        },  {
          id: "development_training",
          title: "Development & Training",
        },
      ],
    }, {
      id: "health_and_safety",
      title: "Health & Safety",
      subItems: [
        {
          id: "employee_health_safety_incident_record",
          title: "Employee Health & Safety incident record",
        },  {
          id: "worker_safety_training_procedures",
          title: "Worker safety training and procedures",
        },
      ],
    }, {
      id: "diversity",
      title: "Diversity",
      subItems: [
        {
          id: "age_based_statistics",
          title: "Age-based statistics",
        },  {
          id: "gender_based_statistics",
          title: "Gender-based statistics",
        },  {
          id: "discrimination_incident_record",
          title: "Discrimination incident record",
        },
      ],
    }, {
      id: "supplier_and_operational_risk",
      title: "Supplier and Operational risk",
      subItems: [
        {
          id: "supplier_screening",
          title: "Supplier screening",
        }, {
          id: "social_engagement_human_rights_training",
          title: "Human Rights training",
        },
      ],
    }, {
      id: "social_engagement",
      title: "Social Engagement",
      subItems: [
        {
          id: "social_engagement_human_rights_training",
          title: "Human Rights training",
        }, {
          id: "local_communities",
          title: "Local communities",
        }, {
          id: "political_contributions",
          title: "Political contributions",
        },
      ],
    },],
  },
  {
    id: "governance",
    title: "Governance",
    subItems: [{
      id: "Ethical Behaviour",
      title: "Ethical Behaviour",
      subItems: [
        {
          id: "anti_corruption_disclosure",
          title: "Anti-corruption disclosure",
        }, {
          id: "anti_corruption_training",
          title: "Anti-corruption training",
        }, {
          id: "anti_competitive_disclosure",
          title: "Anti-competitive disclosure",
        },
      ],
    }, {
      id: "economic_and_financial_disclosure",
      title: "Economic and financial disclosure",
      subItems: [
        {
          id: "direct_economic_impact",
          title: "Direct economic impact",
        }, {
          id: "indirect_economic_impact",
          title: "Indirect economic impact",
        }, {
          id: "subsidies_financial_assistance",
          title: "Subsidies and Financial Assistance",
        }, {
          id: "tax",
          title: "Tax",
        }
      ],
    },],
  },
];

export const selectionPeriod = [
  {
    key: "last_one_month",
    value: "Last one month",
  },
  {
    key: "last_six_months",
    value: "Last six months",
  },
  {
    key: "last_one_year",
    value: "Last one year",
  },
  {
    key: "last_five_years",
    value: "Last five years",
  },
  {
    key: "advanced",
    value: "Advanced",
  },
];

export const userRoles = [
  {
    key: "admin",
    value: "Business Admin",
  },
  {
    key: "sustainability_manager",
    value: "Business Sustainability Manager",
  },
  {
    key: "auditor",
    value: "Auditor",
  },
  {
    key: "business_user",
    value: "Business User",
  },
  {
    key: "community_user",
    value: "External User",
  },
  {
    key: "approver",
    value: "Business Approver",
  },
  {
    key: "facility_manager",
    value: "Business Facility Manager",
  },
  {
    key: "super_admin",
    value: "Super Admin",
  }
];

export const userRolesForAddUser = [
  {
    key: "admin",
    value: "Business Admin",
  },
  {
    key: "sustainability_manager",
    value: "Business Sustainability Manager",
  },
  {
    key: "business_user",
    value: "Business User",
  },
  {
    key: "approver",
    value: "Business Approver",
  },
  {
    key: "facility_manager",
    value: "Business Facility Manager",
  },
];

export const auditStatus = {
  audited: "Audited",
  pending: "Audit pending",
  added: 'Added'
};
