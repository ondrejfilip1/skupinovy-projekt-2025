import NotFound from "../NotFound";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CornerUpLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getBalance, getPayouts } from "@/models/Stripe";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import moment from "moment";

export default function Admin() {
  const chartConfig = {
    amount: {
      label: "Amount",
      color: "#2563eb",
    },
    created: {
      label: "Created",
      color: "#2563eb",
    },
  };

  if (localStorage.getItem("isAdmin") !== "true") return <NotFound />;

  const [balance, setBalance] = useState(0);
  const [payouts, setPayouts] = useState(0);
  const [isLoaded, setLoaded] = useState(false);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    stripeBalance();
  }, []);

  const stripeBalance = async () => {
    const balance = await getBalance();

    if (balance.status === 200) {
      setBalance(balance.balance.pending[0].amount / 100);
      setPayouts(balance.balance.available[0].amount / 100);
    }

    const stripePayouts = await getPayouts();

    if (stripePayouts.status === 200) {
      const formattedData = stripePayouts.payouts.data
        .map((payout) => {
          if (payout.status === "succeeded")
            return {
              created: moment(payout.created * 1000)
                .locale("cs")
                .format("D.M.YYYY"),
              amount: payout.amount / 100,
            };
        })
        // filtrovani spravnych paymentintentu
        .filter((ele) => ele !== undefined);
      setChartData(formattedData);
      console.log(formattedData);
      setLoaded(true);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl flex justify-between items-center">
          Admin panel
          <Link to={-1}>
            <Button>
              <CornerUpLeft />
              Go back
            </Button>
          </Link>
        </h1>
        <h2 className="text-xl mt-2">Games</h2>
        <div className="flex gap-2 my-2">
          <Link to="/admin/game-list">
            <Button>Game list</Button>
          </Link>
          <Link to="/admin/game-create">
            <Button>Create game</Button>
          </Link>
        </div>
        <h2 className="text-xl mt-2">Users</h2>
        <div className="flex gap-2 my-2">
          <Link to="/admin/user-list">
            <Button>User list</Button>
          </Link>
        </div>
        <h2 className="text-xl my-2">Stripe</h2>
        <div className="w-full h-px bg-black my-2 opacity-25" />
        <div className="flex flex-col gap-1 sm:flex-row">
          <div className="w-1/2">
            <p className="font-semibold">Balance</p>
            <p>{Intl.NumberFormat().format(balance)} Kč</p>
          </div>
          <div className="w-1/2">
            <p className="font-semibold">Payouts</p>
            <p>{Intl.NumberFormat().format(payouts)} Kč</p>
          </div>
        </div>
        {isLoaded ? (
          <>
            <ChartContainer
              config={chartConfig}
              className="max-h-130 w-full my-2"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="created"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis dataKey="amount" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
              </BarChart>
            </ChartContainer>
          </>
        ) : (
          <div className="my-12 text-center items-center flex flex-col justify-center gap-2">
            Loading chart...
            <LoadingSpinner />
          </div>
        )}
      </div>
    </>
  );
}
