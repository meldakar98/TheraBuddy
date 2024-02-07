import { useState, useEffect } from 'react';

const useFetch = (url,update) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abort=new AbortController();
    setTimeout(() => {
      fetch(url,{signal: abort.signal})
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        // auto catches network / connection error
        if(err.name==='AbortError')
        {
          console.log('Fetch Aborted')
        }
        else {

          setIsPending(false);
          setError(err.message);
        
        }
      })
    }, 1000);
    return ()=> abort.abort();
  }, [url,update])

  return { data, isPending, error };
}
 
export default useFetch;