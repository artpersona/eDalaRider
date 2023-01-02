import axios from 'axios';
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';

export const PadalaContext = createContext();

const PadalaProvider = ({children}) => {
  //   States
  const [padalaOrders, setPadalaOrders] = useState([]);
  const [padalaHistory, setPadalaHistory] = useState([]);
  // End States

  //   Functions
  const fetchPadalas = async () => {
    await axios
      .get('http://192.168.1.11:8000/api/fetchForPickup')
      .then(res => {
        setPadalaOrders(res.data.padala);
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong: Fetch Padalas');
      });
  };

  const fetchPadalaHistory = () => {
    axios
      .get('http://192.168.1.11:8000/api/fetchHistoryItems')
      .then(res => {
        setPadalaHistory(res.data.padala);
      })
      .catch(err => {
        console.log(err.response.data.message);
        alert('Something went wrong: Fetch Padala History');
      });
  };

  const changePadalaStatus = (id, status) => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://192.168.1.11:8000/api/changePadalaStatus', {
          id,
          status,
        })
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  };

  // Effects
  useEffect(() => {
    fetchPadalas();
    fetchPadalaHistory();
  }, []);

  const payload = {
    padalaOrders,
    padalaHistory,
    changePadalaStatus,
    fetchPadalas,
  };

  return (
    <PadalaContext.Provider
      value={useMemo(() => payload, [padalaOrders, padalaHistory])}>
      {children}
    </PadalaContext.Provider>
  );
};

export default React.memo(PadalaProvider);
export const usePadalaContext = () => useContext(PadalaContext);
