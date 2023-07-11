import { createContext, useContext, useEffect, useState } from 'react';

const PlanetsContext = createContext();

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  return (
    <PlanetsContext.Provider value={ { data } }>
      {children}
    </PlanetsContext.Provider>
  );
}

function usePlanets() {
  const context = useContext(PlanetsContext);
  if (!context) {
    throw new Error('usePlanets must be used within a PlanetsProvider');
  }
  return context;
}

// function Table() {
//   const { data } = usePlanets();

//   if (!data) {
//     return <p>Loading...</p>;
//   }

//   const headers = Object.keys(data[0]).filter((key) => key !== 'residents');

//   return (
//     <table>
//       <thead>
//         <tr>
//           {headers.map((header) => (
//             <th key={header}>{header}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((planet) => (
//           <tr key={planet.name}>
//             {headers.map((header) => (
//               <td key={`${planet.name}-${header}`}>{planet[header]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// function App() {
//   return (
//     <PlanetsProvider>
//       <Table />
//     </PlanetsProvider>
//   );
// }
export { PlanetsProvider, usePlanets };
