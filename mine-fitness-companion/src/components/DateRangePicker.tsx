import { DatePicker } from 'antd'
import dayjs from 'dayjs'

type DateRangePickerPropsType = {
    handleDateRangeChange: (values: dayjs.Dayjs[]) => void
}

export default function DateRangePicker({ handleDateRangeChange }: DateRangePickerPropsType) {

    const { RangePicker } = DatePicker

    const dateFormat = 'DD/MM/YYYY'


    return (
        <RangePicker onChange={(values) => handleDateRangeChange(values)} format={dateFormat} />
    )
}