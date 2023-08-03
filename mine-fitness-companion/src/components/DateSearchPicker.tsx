import { DatePicker } from 'antd'
import dayjs from 'dayjs'

type DatePickerPropsType = {
    handleDateChange: (values: dayjs.Dayjs | null) => void
}

export default function DateSearchPicker({ handleDateChange }: DatePickerPropsType) {



    const dateFormat = 'DD/MM/YYYY'


    return (
        <DatePicker onChange={(values) => handleDateChange(values)} format={dateFormat} />
    )
}