import type React from "react";

import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { useFetchCoinPrice, useFetchHistoryData } from "./hooks";
import { Chart } from "./components/chart";
import { useState } from "react";
import config from "./config";
import { formatMoney } from "./util";



export default function App() {
  const [coinId, setCoinId] = useState(config.defaultCoinId);
  const { data, fetchPrice,error } = useFetchCoinPrice(config.defaultCoinId);
  const { data: historyData, fetchHistory  , error: historyError} = useFetchHistoryData(
    config.defaultCoinId
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPrice(coinId);
    fetchHistory(coinId, new Date());
  };

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Simple Crypto Price Tracker
      </h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Cryptocurrency</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex gap-2 w-full">
              <div className="relative flex gap-2 flex-col w-1/3"> 
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter symbol (e.g., bitcoin, ethereum)"
                  value={coinId}
                  onChange={(e) => setCoinId(e.target.value)}
                  className="pl-8"
                />
                <Button type="submit">Track</Button>
              </div>
              <div>
                <div className="text-xl">Current Price: <span className="font-bold">{formatMoney(data?.data[coinId.toLowerCase()]?.usd.toString()||'0' )}</span></div>
              </div>
            </div>
          </form>
          <div className="text-red-500">{(error || historyError) && 'Something Went Wrong!!'}</div>
        </CardContent>
      </Card>

      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>Price Chart Daily</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full">
            {historyData?.data?.length && <Chart data={historyData.data} />}
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
