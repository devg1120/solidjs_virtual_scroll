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
  let PadTop = [];
  let PadBottom = [];
  let MAX_COLUMN = 10;
  let MAX_ROWN = 1000;

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

     //Style.push({ height:20 } );

   
     if ( (r+1) % 10 == 0 ) {
         Style.push({ height:80 } );
     } else if ( (r+1) % 23 == 0 ) {
         Style.push({ height:180 } );
     } else {
         Style.push({ height:20 } );
     }
     
  }

  let pad = 0;
  for (let i =  0; i < Data.length; i++) {
       PadTop.push(pad);
       pad += Style[i].height
  }
  let total_height = pad;


  for (let i =  0; i < Data.length-1; i++) {
       PadBottom.push( total_height - PadTop[i+1]);
  }
  PadBottom.push(0);

  console.log(total_height);
  console.log(PadTop);
  console.log(PadBottom);

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
		    padTop={PadTop}
		    padBottom={PadBottom}
             ></Table>
       </div>
    </>
  )
}

export default App
