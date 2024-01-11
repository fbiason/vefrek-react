export const verifyIfHasChanges = (childObject, parentObject) => {
    let hasChanged = false;
    const verify = (childObject, parentObject) => {
        if (hasChanged) return;
        for (const key in childObject) {
            if (typeof childObject[key] === "object") {
                verify(childObject[key], parentObject[key]);
            } else {
                if (childObject[key] !== parentObject[key]) {
                    hasChanged = true;
                    return;
                }
            }
        }
    }
    verify(childObject, parentObject);
    return hasChanged;
}