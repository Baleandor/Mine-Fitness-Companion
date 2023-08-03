export type ChartDataType = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
    }[];
}

export type MeasurementDataType = {
    user: string;
    imageUrl: string[];
    measurements: {
        weight: number;
        chest: number;
        waist: number;
        hips: number;
        biceps: number;
        date: number;
    }[];
}

export type NewMeasurementDataType = {
    biceps: number;
    chest: number;
    date: number;
    hips: number;
    imageUrl: string;
    waist: number;
    weight: number;
}

export type BasicInfoType = {
    name: string;
    email: string;
    currentPassword: string
    password: string;
    gender: string;
    dateOfBirth: number;
    height: number
}

export type ExercisesType = {
    id: number;
    name: string;
    muscleGroups: string[]
}


