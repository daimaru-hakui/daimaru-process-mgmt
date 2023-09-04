import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { FC } from "react";
import { Task } from "../../types";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  task: Task;
};

const PieChart: FC<Props> = ({ task }) => {
  const endTime = Math.max(
    task.pattern.endTime.toDate(),
    task.cutting.endTime.toDate(),
    task.materials.endTime.toDate(),
    task.sewing.endTime.toDate(),
    task.finishing.endTime.toDate(),
    task.warehouse.endTime.toDate()
  );
  const startTime = +task.createdAt.toDate();
  const totalTime = endTime - startTime;
  const pattern = task.pattern.elapsedTime / totalTime * 100;
  const cutting = task.cutting.elapsedTime / totalTime * 100;
  const materials = task.materials.elapsedTime / totalTime * 100;
  const sewing = task.sewing.elapsedTime / totalTime * 100;
  const finishing = task.finishing.elapsedTime / totalTime * 100;
  const warehouse = task.warehouse.elapsedTime / totalTime * 100;

  const timeCalc = (time: any) => {
    if (time === 0) return "";
    if (time <= 0) return "失敗";
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 60 / 60) % 24);
    const days = Math.floor((time / 1000 / 60 / 60 / 24) % 365);
    const daysText = days === 0 ? "" : days + "日";
    const hoursText = hours === 0 ? "" : hours + "時間";
    const minutesText = minutes === 0 ? "" : minutes + "分";
    const secondsText = seconds === 0 ? "" : seconds + "秒";
    return daysText + hoursText + minutesText + secondsText;
  };
  console.log(timeCalc(totalTime));
  console.log((pattern / totalTime) * 100);

  const data = {
    labels: ["パターン", "裁断", "資材準備", "縫製加工", "仕上げ", "倉庫入荷"],
    datasets: [
      {
        label: "時間の割合",
        data: [
          pattern,
          cutting,
          materials,
          sewing,
          finishing,
          warehouse,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};
export default PieChart;
