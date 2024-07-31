type DataProps = {
    error: string;
    status: number;
    text: string;
    block: React.JSX.Element;
  };
  
  const Data = ({ error, status, text, block }: DataProps) => {
    if (error.length > 0) {
      return <h2>{error}</h2>;
    } else if (status === 500) {
      return <h2>{text}</h2>;
    } else {
      return <>{block}</>;
    }
  };
  
  export { Data };
  