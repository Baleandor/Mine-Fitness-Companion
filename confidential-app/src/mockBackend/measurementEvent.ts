import dayjs from "dayjs"

export const measurementEvent = new Map()

measurementEvent.set('imageUrl', ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJyXIyQ8hWmx6Z-4x5l_-qJVjObcudPNrImXt3I4eg%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1&ipt=5aaf02fce7babdc256a9be0c68a98e58c9de24dbcf84cb5d3f45971bebaed610&ipo=images'])
measurementEvent.set('weight', [100, 102, 104, 107])
measurementEvent.set('chest', [120, 122, 125, 128])
measurementEvent.set('waist', [70, 70, 71, 71])
measurementEvent.set('hips', [85, 85, 87, 89])
measurementEvent.set('biceps', [45, 46, 48, 50])
measurementEvent.set('date', [1685960814668, dayjs('08/06/2023').format('DD/MM/YYYY'), dayjs('10/06/2023').format('DD/MM/YYYY'), dayjs('12/06/2023').format('DD/MM/YYYY')])
measurementEvent.set('user', 'Jotaro')

export const measurementData = [
    { date: "05/06/2023", weight: 100, chest: 120, waist: 70, hips: 85, biceps: 45 },
    { date: "08/06/2023", weight: 102, chest: 122, waist: 70, hips: 85, biceps: 46 },
    { date: "10/06/2023", weight: 104, chest: 125, waist: 71, hips: 87, biceps: 48 },
    { date: "15/06/2023", weight: 107, chest: 128, waist: 71, hips: 89, biceps: 50 },
]

export const measurementEventByIdMap = new Map([
    [1, {
        user: 'Jotaro',
        imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJyXIyQ8hWmx6Z-4x5l_-qJVjObcudPNrImXt3I4eg%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1&ipt=5aaf02fce7babdc256a9be0c68a98e58c9de24dbcf84cb5d3f45971bebaed610&ipo=images',
        weight: [100, 102, 104, 107],
        chest: [120, 122, 125, 128],
        waits: [70, 70, 71, 71],
        hips: [85, 85, 87, 89],
        biceps: [45, 46, 48, 50],
        date: [1685960814668]
    }]
])










