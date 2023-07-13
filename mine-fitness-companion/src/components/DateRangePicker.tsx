import { DatePicker } from 'antd'
import dayjs from 'dayjs'

type DateRangePickerPropsType = {
    handleDateRageChange: (values: dayjs.Dayjs[]) => void
}

export default function DateRagePicker({ handleDateRageChange }: DateRangePickerPropsType) {

    const { RangePicker } = DatePicker

    const dateFormat = 'DD/MM/YYYY'


    return (
        <RangePicker onChange={(values) => handleDateRageChange(values)} format={dateFormat} />
    )
}