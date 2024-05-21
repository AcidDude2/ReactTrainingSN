export type FieldValiatorType = (value: string) => string | undefined;

export const required: FieldValiatorType = (value) => {
    if (!value) return "Field is required";
    return undefined;
}

export const maxLengthCreator = (maxValue: number): FieldValiatorType => (value) => {
    if (value.length > maxValue) return `Max length is ${maxValue} symbols`;
    return undefined;
}