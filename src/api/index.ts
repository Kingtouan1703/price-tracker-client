import config from "../config";



export type PriceResponse<Key extends string> = {
    data: Record<Key, Record<'usd', number>>;
  };


  
  const getCurrentPrice = async <T extends string>(coinId: T): Promise<PriceResponse<T>> => {
    const response = await fetch(`${config.baseUrl}/price/${coinId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch coin price');
    }
    const result: PriceResponse<T> = await response.json();
    return result;
  };



  export type  CryptoData = {
    coinId: string
    time: string
    value: string
  }
  
  export type CryptoChartProps =  {
    data: CryptoData[]
  } 


  const getHistoryData = async(coinId: string, from: Date, limit: number) => {
    const formNumber = from.getTime();
    const url = `${config.baseUrl}/history?coinId=${coinId}&from=${formNumber}&limit=${limit}`
    
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch coin price');
    }
    const result : CryptoChartProps = await response.json();
    return result;
  };
  

export {getCurrentPrice ,getHistoryData}