import { createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
//import './App.css'
//import { Button } from "../../packages/ui/src/components/ui/button";
import { Button } from "./packages/ui/src/components/button";
import { Table } from "./packages/ui/src/components/table";

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
  return <div>H {n}!</div>
};

type Person = {
  name: string;
};

  let ColumnDefs = [
  {
    accessorKey: "a",
    header: h("a"),
    cell: () => { return "A" },
  },
  {
    accessorKey: "b",
    header: h("b"),
    cell: () => { return "B" },
  },
  {
    accessorKey: "c",
    header: h("c"),
    cell: () => { return "C" },

  },

  ];

  let Data = [
	   ["AAAA" , "BBBB", "CCCCC"],
	   ["AAAA" , "BBBB", "CCCCC"],
	   ["AAAA" , "BBBB", "CCCCC"],
	   ["AAAA" , "BBBB", "CCCCC"],
	   ["AAAA" , "BBBB", "CCCCC"],
   
  ];

  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          class="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count()}
        </button>
      </section>
      <Button onClick={() => alert("Hello Libra UI!")}>
        Click Me
      </Button>
      <Table columns={ColumnDefs} data={Data} ></Table>

    </>
  )
}

export default App
