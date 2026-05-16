import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
//import './App.css'
//import { Button } from "../../packages/ui/src/components/ui/button";
//import { Button } from "./packages/ui/src/components/button";
//import { Table } from "./packages/ui/src/components/table";
import { Table } from "./table";

function App() {
  const [count, setCount] = createSignal(0)

/*
// 列の定義
export interface ColumnDef<T> {
  accessorKey: keyof T;
  header: JSX.Element;
  cell: (row: T) => JSX.Element;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  width?: string | number;
}
*/

const h = (n): JSX.Element => {
  return <div style={{width:"150px", color:"green"}} >{n}</div>
};

  let ColumnDefs = [
  {
    //accessorKey: "a",
    header: h("a"),
    cell: (x) => { return x[0] },
    enableSorting: false,
    enableFiltering: false,
  },
  {
    //accessorKey: "b",
    header: h("b"),
    cell: (x) => { return x[1] },
    enableSorting: false,
    enableFiltering: false,
  },
  {
    //accessorKey: "c",
    header: h("c"),
    cell: (x) => { return x[2] },
    enableSorting: false,
    enableFiltering: false,

  },

  ];

  let Data = [
	   ["1A" , "1B", "1C"],
	   ["2A" , "2B", "2C"],
	   ["3A" , "3B", "3C"],
	   ["4A" , "4B", "4C"],
	   ["5A" , "5B", "5C"],
   
  ];


  let ColumnDefs2 = [];
  let Data2 = [];
  let Style2 = [];
  let MAX_COLUMN = 10;
  let MAX_ROWN = 10000;

  for ( let i=0; i< MAX_COLUMN; i++) {
      let c = (i + 10).toString(36).toUpperCase();
      //console.log(i,c);
      const func = (x) => { return x[i] }
      ColumnDefs2.push(
         {
           //accessorKey: "c",
           header: h(c),
           cell: func,
           enableSorting: false,
           enableFiltering: false,

         }
      );
  }

  for ( let r=0; r< MAX_ROWN; r++) {
     let row = []
     for ( let i=0; i< MAX_COLUMN; i++) {
         let c = (i + 10).toString(36).toUpperCase();
         //console.log(i,c);
	 let label = String(r + 1) + c
         row.push(
	    label
         );
     }
     Data2.push(row);

     if ( r % 10 == 0 ) {
         Style2.push({ height:80 } );
     } else {
         Style2.push({ height:20 } );
     }
  }

  //console.log(Data2)

  return (
    <>
      <style jsx>{`

        table {
          //color: orange;
          border-collapse: collapse;
	  border: solid gray 1px;
        }

	th, td {
	  border: solid gray 1px;
	}

        .tablebase {
          height: 400px;
        }

      `}</style>

       <div class="tablebase">
             <Table columns={ColumnDefs2} 
                    data={Data2} 
                    style={Style2} 
       	            rowHeight={20}
       	            enableFiltering={false}
       	            enableColumnPinning={false}
             ></Table>
       </div>
    </>
  )
}

/*
	     layout="fit"
	     layout="overflow"

*/
export default App
