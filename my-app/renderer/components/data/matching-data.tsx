const duferco_mk_matchings = [
  {
    id: "mkgr",
    label: "(MK-GR) North Macedonia - Greece",
  },
  {
    id: "grmk",
    label: "(GR-MK) Greece - North Macedonia",
  },
  {
    id: "mkxk",
    label: "(MK-XK)- North Macedonia - Kosovo",
  },
  {
    id: "xkmk",
    label: "(XK-MK) Kosovo - North Macedonia",
  },
] as const

const duferco_hellas_matchings = [
    {
      id: "xkme",
      label: "(XK-ME) Kosovo - Montenegro",
    },
    {
      id: "mexk",
      label: "(ME-XK) Montenegro - Kosovo",
    },
    {
      id: "gral",
      label: "(GR-AL) Greece - Albania",
    },
    {
      id: "algr",
      label: "(AL-GR) Albania - Greece",
    },
    {
        id : "alme",
        label : "(AL-ME) Albania - Montenegro"
    },
    {
        id : "meal",
        label : "(ME-AL) Montenegro - Albania"
    },
    {
        id : "itme",
        label : "(IT-ME) Italy - Montenegro"
    },
    {
        id : "meit",
        label : "(ME-IT) Montenegro"
    }
  ] as const

  const eso_matchings = [
    {
        id: "mkbg",
        label: "(MK-BG) North Macedonia - Bulgaria",
        },
        {
        id: "bgmk",
        label: "(BG-MK) Bulgaria - North Macedonia",
        }
    ] as const

    const jao_matchings = [
        {
            id:"hurs",
            label:"(HU-RS) Hungary - Serbia"
        },
        {
            id : "rshu",
            label : "(RS-HU) Serbia - Hungary"
        },
        { 
            id: "bgrs",
            label: "(BG-RS) Bulgaria - Serbia"
        },
        {
            id: "rsbg",
            label: "(RS-BG) Serbia - Bulgaria"
        }
    ] as const


export { duferco_mk_matchings, duferco_hellas_matchings, eso_matchings, jao_matchings }