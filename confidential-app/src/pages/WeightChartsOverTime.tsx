import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { exerciseMeasuringData } from "../mockBackend/exercise";


export default function WeightChartsOverTime() {

    
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="p-1">
                <span>Exercise Weight Measurements Over Time</span>
            </div>

            <LineChart width={600} height={300} data={exerciseMeasuringData}>
                <Line type={"monotone"} dataKey={'weight'} stroke="red" strokeWidth={2}></Line>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey={'date'} />
                <YAxis />
                <Tooltip />
                <Legend />
            </LineChart>

        </div>
    )
}