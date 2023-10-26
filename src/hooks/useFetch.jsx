import { useEffect, useState } from "react";

export default function useFetch(getData, id) {
  let [data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        if(id){
          response = await getData(id);
        }
        else{
          response = await getData();   
        }
        let dataWithIds = response.data.data.map((item) => ({
            ...item,
            id: item._id,
          }));

          setData(dataWithIds);
        setIsLoading(false);
        
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  

  return [data, isLoading];
}