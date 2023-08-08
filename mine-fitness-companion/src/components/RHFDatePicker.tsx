import DatePicker from "antd/es/date-picker"
import dayjs from "dayjs"
import { Control, Controller } from "react-hook-form"
import customParseFormat from 'dayjs/plugin/customParseFormat'


interface RHFDatePickerFieldProps {
    control: Control<any>;
    name: string;
}

export default function RHFDatePicker({ control, name }: RHFDatePickerFieldProps) {
    dayjs.extend(customParseFormat)

    const dateFormat = 'DD/MM/YYYY'

    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: "This field is required"
            }}
            render={({ field }) => {
                return (
                    <DatePicker
                        format={dateFormat}
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        value={field.value ? dayjs(field.value, 'DD/MM/YYYY') : null}
                        onChange={(date) => {
                            field.onChange(date ? dayjs(date).format('DD/MM/YYYY') : null);
                        }}
                    />
                );
            }}
        />
    );
};