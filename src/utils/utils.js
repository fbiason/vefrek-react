export const verifyIfHasChanges = (form1, form2) => {
    let hasChanged = false;
    const verify = (form1, form2) => {
        if (hasChanged) return;
        for (const key in form1) {
            if (typeof form1[key] === "object") {
                verify(form1[key], form2[key]);
            } else {
                if (form1[key] !== form2[key]) {
                    hasChanged = true;
                    return;
                }
            }
        }
    }
    verify(form1, form2);
    return hasChanged;
}

export const generateRegEx = (str) => {         //Genera una expresion regular que hace coincidir una busqueda en mongoose por mas que la palabra tenga letras con mayuscula o acentos  
    const regexIndex = [                        // Ejemplo sin el la base de datos tenemos una campo {subcategory: "Estación de Servicio"} lo encontraremos con la query
        {a: "[aAáÁ]"},                          // {subcategory: "estación de servicio"} o {subcategory: "EStÁción de serVicío"}
        {b: "[bB]"},
        {c: "[cC]"},
        {d: "[dD]"},
        {e: "[eEéÉ]"},
        {f: "[fF]"},
        {g: "[gG]"},
        {h: "[hH]"},
        {i: "[iIíÍ]"},
        {j: "[jJ]"},
        {k: "[kK]"},
        {l: "[lL]"},
        {m: "[mM]"},
        {n: "[nN]"},
        {o: "[oOóÓ]"},
        {p: "[pP]"},
        {q: "[qQ]"},
        {r: "[rR]"},
        {s: "[sS]"},
        {t: "[tT]"},
        {u: "[uUúÚ]"},
        {v: "[vV]"},
        {w: "[wW]"},
        {x: "[xX]"},
        {y: "[yY]"},
        {z: "[zZ]"},
        {á: "[aAáÁ]"},
        {é: "[eEéÉ]"},
        {í: "[iIíÍ]"},
        {ó: "[oOóÓ]"},
        {ú: "[uUúÚ]"},
        {" ": "[ ]"},
    ]
    
    const regex = str.split("").map((letter) => {   
        const regexObj = regexIndex.find((regexObj) => regexObj[letter.toLowerCase()]);
        return regexObj ? regexObj[letter.toLowerCase()] : letter;
    })
    return `^${regex.join("")}$`;
}