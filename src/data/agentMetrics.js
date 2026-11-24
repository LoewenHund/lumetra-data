export const metricDefinitions = [
  {
    key: 'resolvedTickets',
    label: 'Gelöste Tickets',
    shortLabel: 'Tickets',
    description: 'Abgeschlossene Supportfälle im Verhältnis zum höchsten Agentenwert.'
  },
  {
    key: 'customerSatisfaction',
    label: 'Kundenzufriedenheit',
    shortLabel: 'Zufriedenheit',
    description: 'Durchschnittliche Kundenbewertung, auf eine Skala von 0 bis 100 übertragen.'
  },
  {
    key: 'resolutionSpeed',
    label: 'Lösungsgeschwindigkeit',
    shortLabel: 'Geschwindigkeit',
    description: 'Relative Geschwindigkeit auf Basis der durchschnittlichen Lösungszeit.'
  },
  {
    key: 'sustainableResolution',
    label: 'Nachhaltige Lösung',
    shortLabel: 'Nachhaltigkeit',
    description: 'Anteil der abgeschlossenen Tickets, die nicht erneut geöffnet wurden.'
  },
  {
    key: 'slaCompliance',
    label: 'SLA-Einhaltung',
    shortLabel: 'SLA',
    description: 'Anteil der Tickets, die innerhalb der vereinbarten Zielzeit bearbeitet wurden.'
  }
]

// Quelle: veröffentlichte Tableau-Arbeitsmappe Custumer_Support_Example.
// Die Lösungsgeschwindigkeit wurde aus der durchschnittlichen Lösungszeit
// aller zwölf Agenten neu normalisiert: schnellster Agent = 100, langsamster = 0.
export const agentMetrics = [
  {
    id: 'Agent-01',
    resolvedCount: 176,
    averageResolutionHours: 12.834261,
    resolvedTickets: 53.658537,
    customerSatisfaction: 82.333333,
    resolutionSpeed: 83.522778,
    sustainableResolution: 89.204545,
    slaCompliance: 77.272727
  },
  {
    id: 'Agent-02',
    resolvedCount: 202,
    averageResolutionHours: 12.987376,
    resolvedTickets: 61.585366,
    customerSatisfaction: 82.281553,
    resolutionSpeed: 81.330474,
    sustainableResolution: 90.594059,
    slaCompliance: 75.247525
  },
  {
    id: 'Agent-03',
    resolvedCount: 185,
    averageResolutionHours: 11.683459,
    resolvedTickets: 56.402439,
    customerSatisfaction: 84.831461,
    resolutionSpeed: 100,
    sustainableResolution: 94.594595,
    slaCompliance: 76.756757
  },
  {
    id: 'Agent-04',
    resolvedCount: 257,
    averageResolutionHours: 14.051284,
    resolvedTickets: 78.353659,
    customerSatisfaction: 79.605263,
    resolutionSpeed: 66.097406,
    sustainableResolution: 93.774319,
    slaCompliance: 70.817121
  },
  {
    id: 'Agent-05',
    resolvedCount: 248,
    averageResolutionHours: 15.05746,
    resolvedTickets: 75.609756,
    customerSatisfaction: 79.791667,
    resolutionSpeed: 51.690948,
    sustainableResolution: 87.903226,
    slaCompliance: 67.741935
  },
  {
    id: 'Agent-06',
    resolvedCount: 296,
    averageResolutionHours: 14.252669,
    resolvedTickets: 90.243902,
    customerSatisfaction: 80.961538,
    resolutionSpeed: 63.21397,
    sustainableResolution: 92.22973,
    slaCompliance: 69.594595
  },
  {
    id: 'Agent-07',
    resolvedCount: 320,
    averageResolutionHours: 18.607813,
    resolvedTickets: 97.560976,
    customerSatisfaction: 75.506757,
    resolutionSpeed: 0.856873,
    sustainableResolution: 95.3125,
    slaCompliance: 52.1875
  },
  {
    id: 'Agent-08',
    resolvedCount: 316,
    averageResolutionHours: 18.667658,
    resolvedTickets: 96.341463,
    customerSatisfaction: 72.712418,
    resolutionSpeed: 0,
    sustainableResolution: 92.405063,
    slaCompliance: 44.936709
  },
  {
    id: 'Agent-09',
    resolvedCount: 328,
    averageResolutionHours: 18.590427,
    resolvedTickets: 100,
    customerSatisfaction: 71.783626,
    resolutionSpeed: 1.105802,
    sustainableResolution: 92.073171,
    slaCompliance: 46.95122
  },
  {
    id: 'Agent-10',
    resolvedCount: 300,
    averageResolutionHours: 18.4011,
    resolvedTickets: 91.463415,
    customerSatisfaction: 73.049645,
    resolutionSpeed: 3.81659,
    sustainableResolution: 90,
    slaCompliance: 49.333333
  },
  {
    id: 'Agent-11',
    resolvedCount: 214,
    averageResolutionHours: 17.507664,
    resolvedTickets: 65.243902,
    customerSatisfaction: 78.605769,
    resolutionSpeed: 16.608844,
    sustainableResolution: 93.457944,
    slaCompliance: 59.345794
  },
  {
    id: 'Agent-12',
    resolvedCount: 225,
    averageResolutionHours: 17.260622,
    resolvedTickets: 68.597561,
    customerSatisfaction: 75.707547,
    resolutionSpeed: 20.14599,
    sustainableResolution: 90.666667,
    slaCompliance: 58.222222
  }
]
