import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const GraficaVentasAnuales = () => {
  const dataVentas = [
    { name: "Enero", value: 4000 },
    { name: "Febrero", value: 3000 },
    { name: "Marzo", value: 5000 },
    { name: "Abril", value: 4500 },
    { name: "Mayo", value: 6000 },
    { name: "Junio", value: 3500 },
    { name: "Julio", value: 7000 },
    { name: "Agosto", value: 6500 },
    { name: "Septiembre", value: 5000 },
    { name: "Octubre", value: 4800 },
    { name: "Noviembre", value: 5200 },
    { name: "Diciembre", value: 5500 },
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4567",
    "#FFC107",
    "#36A2EB",
    "#FF6384",
    "#4BC0C0",
    "#9966FF",
    "#E7E9ED",
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={dataVentas}
          cx="50%"
          cy="50%"
          outerRadius={150}
          dataKey="value"
          label
        >
          {dataVentas.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GraficaVentasAnuales;
