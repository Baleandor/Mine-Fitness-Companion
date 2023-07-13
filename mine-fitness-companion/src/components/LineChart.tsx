import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function LineChart({ chartData }) {


    return (
        <Line data={chartData} options={{
            scales: {
                y: {
                    ticks: {
                        callback: (value, index, ticks) => {
                            return value + 'kg'
                        }
                    }
                }
            }
        }} />
    )
}