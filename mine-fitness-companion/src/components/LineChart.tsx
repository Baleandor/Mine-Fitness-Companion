import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function LineChart({ chartData }) {

    const { state } = useLocation()


    return (
        <Line data={chartData} options={{
            scales: {
                y: {
                    ticks: {
                        callback: (value, index, ticks,) => {

                            return state ? value + 'kg' : value + 'cm'
                        }
                    }
                }
            }
        }} />
    )
}