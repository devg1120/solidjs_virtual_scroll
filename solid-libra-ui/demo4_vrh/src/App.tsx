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

  const h = (n): JSX.Element => {
    return <div style={{width:"150px", color:"green"}} >{n}</div>
  };

  let ColumnDefs = [];
  let Data = [];
  let Style = [];
  let MAX_COLUMN = 10;
  let MAX_ROWN = 10000;

  for ( let i=0; i< MAX_COLUMN; i++) {
      let c = (i + 10).toString(36).toUpperCase();
      //console.log(i,c);
      const func = (x) => { return x[i] }
      ColumnDefs.push(
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
     Data.push(row);

     if ( r % 10 == 0 ) {
         Style.push({ height:80 } );
     } else if ( r % 25 == 0 ) {
         Style.push({ height:200 } );
     } else {
         Style.push({ height:20 } );
     }
  }


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
             <Table columns={ColumnDefs} 
                    data={Data} 
                    style={Style} 
       	            rowHeight={20}
             ></Table>
       </div>
    </>
  )
}

export default App
