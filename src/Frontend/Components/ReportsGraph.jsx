import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { mes: "Enero", ventas: 5000, gastos: 3000 },
  { mes: "Febrero", ventas: 7000, gastos: 4000 },
  { mes: "Marzo", ventas: 6500, gastos: 3500 },
  { mes: "Abril", ventas: 8000, gastos: 5000 },
  { mes: "Junio", ventas: 9000, gastos: 6000 },
  { mes: "Julio", ventas: 5000, gastos: 3000 },
  { mes: "Agosto", ventas: 7000, gastos: 4000 },
  { mes: "Septiembre", ventas: 6500, gastos: 3500 },
  { mes: "Octubre", ventas: 8000, gastos: 5000 },
  { mes: "Noviembre", ventas: 9000, gastos: 6000 },
  { mes: "Diciembre", ventas: 9000, gastos: 6000 },
];

const GraficaVentasGastos = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ventas" fill="#4CAF50" name="Ventas" />
        <Bar dataKey="gastos" fill="#F44336" name="Gastos" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraficaVentasGastos;
