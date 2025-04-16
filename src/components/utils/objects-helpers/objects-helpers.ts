export const updateObjectsInArray = <T>(
    items: T[],
    itemId: any,
    objPropName: keyof T,
    newObjProps: Partial<T>
): T[] => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return { ...u, ...newObjProps };
        }
        return u;
    });
};