import { For, Show, mergeProps, type Component, createMemo } from "solid-js";

import { useTable } from "./use-table";
import type { TableProps } from "./types";

export const Table = <T extends {}>(props: TableProps<T>) => {
  const mergedProps = mergeProps(
    {
      headerVariant: "default" as "default" | "brand" | undefined,
      striped: false,
      showRowBorder: true,
      layout: "fit" as "fit" | "overflow" | undefined,
      rowHeight: 41,
      filterPlaceholder: "テーブル内を検索...",
      enableFiltering: true,
      enableColumnPinning: true,
    },
    props
  );

  const {
    setContainerRef,
    virtualizer,
    handleScroll,
  } = useTable(mergedProps);


  //const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);
  const range = (start, end) => Array.from({ length: end - start  }, (_, i) => start + i);

          // <For each={virtualizer().row_index}>
          // <For each={range(virtualizer().startIndex, virtualizer().endIndex)}>

  return (
    <div 
        style={{ "height": "100%"  }}  //GUSA
    >
      <div
        ref={setContainerRef}
        onScroll={handleScroll}
        style={{ "scroll-padding-top": "32px"  }}
        style={{ "overflow-y": "scroll"  }} //GUSA
        style={{ "height": "100%"  }}       //GUSA
      >
        <table>
          <thead >
            <tr>
              <For each={props.columns}>
                {(column) => {
                  return (
                    <th>
                      <div >
                        <span>{column.header}</span>
                      </div>
                    </th>
                  );
                }}
              </For>
            </tr>
          </thead>
          <tbody>

            <Show when={virtualizer().paddingTop > 0}>
              <tr>
                <td
                  style={{
                    height: `${virtualizer().paddingTop}px`,
                    padding: 0,
                  }}
                />
              </tr>
            </Show>

            <For each={virtualizer().row_index}>
              {(i) => {
	        const row = props.data[i];
                return (
                  <tr
                    //style={{ height: `${mergedProps.rowHeight}px` }}
                    //style={{ height: `${row.style.height}px` }}
                    style={{ height: `${props.style[i].height}px` }}
                  >
                    <For each={props.columns}>
                      {(column) => {
                        return (
                          <td>
                            {column.cell(row)}
                          </td>
                        );
                      }}
                    </For>
                  </tr>
                );
              }}
            </For>

            <Show when={virtualizer().paddingBottom > 0}>
              <tr>
                <td
                  style={{
                    height: `${virtualizer().paddingBottom}px`,
                    padding: 0,
                  }}
                />
              </tr>
            </Show>

          </tbody>
        </table>
      </div>
    </div>
  );
};

//export default Table;
