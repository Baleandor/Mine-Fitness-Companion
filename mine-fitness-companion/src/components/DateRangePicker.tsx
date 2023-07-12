import { DatePicker } from 'antd'
import dayjs from 'dayjs'

type DateRangePickerPropsType = {
    handleDateRageChange: (values: dayjs.Dayjs[]) => void
}

export default function DateRagePicker({ handleDateRageChange }: DateRangePickerPropsType) {

    const { RangePicker } = DatePicker


    return (
        <RangePicker onChange={(values) => handleDateRageChange(values)} />
    )
}