const debounce = <T extends (...args: any[]) => void>(callback: T, time: number): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
  
    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(...args);
      }, time);
    };
  };
  

  function formatMoney(value:string) {
    let number = parseFloat(value);
    if (isNaN(number)) {
        throw new Error("Invalid number format");
    }
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
}

  export { debounce ,formatMoney };
  