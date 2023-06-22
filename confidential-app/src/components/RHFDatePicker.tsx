import DatePicker from "antd/es/date-picker"
import dayjs from "dayjs"
import { Control, Controller } from "react-hook-form"


interface RHFDatePickerFieldProps {
    control: Control<any>;
    name: string;
}

export default function RHFDatePicker({ control, name }: RHFDatePickerFieldProps) {


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
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => {
                            field.onChange(date ? date.valueOf() : null);
                        }}
                    />
                );
            }}
        />
    );
};