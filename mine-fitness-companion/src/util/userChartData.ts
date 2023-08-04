import dayjs from "dayjs"

export const userChartData = (chartDataMap: any[]) => {

    const startingLabels: number[] = []
    const datasets: { label: string, data: number[] }[] = []

    const includedLabels: string[] = []
    chartDataMap.forEach((dataEntry) => {
        startingLabels.push(dataEntry.date)

        Object.entries(dataEntry).map((measurement) => {
            if (measurement[0] !== 'date' && measurement[0] !== 'id' && measurement[0] !== 'image_url' && measurement[0] !== 'user_id') {
                if (!includedLabels.includes(measurement[0])) {
                    datasets.push({ label: measurement[0], data: [measurement[1]] })
                    includedLabels.push(measurement[0])
                } else {
                    datasets.forEach((set) => {
                        if (set.label === measurement[0]) {
                            set.data.push(measurement[1])
                        }
                    })
                }
            }
        })
    })

    startingLabels.sort((a, b) => a - b)

    const labels = startingLabels.map((date) => {
        return dayjs(date).format('DD/MM/YYYY')
    })

    return { labels, datasets }
}