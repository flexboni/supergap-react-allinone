import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";

interface Airline {
  id: number;
  name: string;
  country: string;
  logo: string;
  slogan: string;
  head_quaters: string;
  website: string;
  established: string;
}

interface Passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline;
  __v: number;
}

function App() {
  const [page, setPage] = useState(0); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지
  const [items, setItems] = useState<Passenger>(); // list items

  useEffect(() => {
    const fetch = async () => {
      const params = { page, size: 10 };
      const {
        data: { totalPages, data },
      } = await axios.get("https://api.instantwebtools.net/v1/passenger", {
        params,
      });

      setTotalPages(totalPages);
      setItems(data);
    };

    fetch();
  }, []);

  const handlePageChange = (selectedPage: number): void => {
    setPage(selectedPage);
  };

  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {Array.isArray(items) &&
          items.map((item) => <li key={item._id}>{item.name}</li>)}
      </ul>
      <Pagination
        count={totalPages}
        page={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
