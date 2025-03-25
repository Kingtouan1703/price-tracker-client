import { useState, useCallback, useEffect } from 'react';
import { CryptoChartProps, getCurrentPrice, getHistoryData, PriceResponse } from '../api';


const useFetchCoinPrice = (coinId:string) => {
  const [data, setData] = useState<PriceResponse<string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const fetchPrice = useCallback(async (initCoinId:string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getCurrentPrice(initCoinId)
      setData(result);
    } catch (err) {
      console.log(err)
      setError("Fetch coin error!");
    } finally {
      setLoading(false);
    }
  }, [coinId]);

  useEffect(() => {
    fetchPrice(coinId)
  },[])

  return { data, loading, error, fetchPrice  };
};



const useFetchHistoryData = (coinId:string) => {
    const [data, setData] = useState<CryptoChartProps|null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
  
    const fetchHistory = async (coinId: string, from: Date) => {
      setLoading(true);
      setError(null);
  
      try {
        const result = await getHistoryData(coinId, from, 365);
        setData(result);
      } catch (err) {
        console.log({err})
        setError("Fetch history error!");

      } finally {
        setLoading(false);
      }
    };
  

    useEffect(() => {
      fetchHistory(coinId , new Date())
      },[])

    return { data, loading, error, getHistoryData ,fetchHistory};
  };

export  {useFetchCoinPrice , useFetchHistoryData};
