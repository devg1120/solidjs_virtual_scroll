import { createSignal, createMemo, onMount, type JSX } from "solid-js";
import type { TableProps, SortConfigItem } from "./types";

export const useTable = <T extends {}>(props: TableProps<T>) => {
/* props
       data
       style
       rowHeight
*/

/*
  const [pinnedColumnKeys, setPinnedColumnKeys] = createSignal<Array<keyof T>>(
    []
  );
*/
  const [scrollTop, setScrollTop] = createSignal(0);
  const [containerHeight, setContainerHeight] = createSignal(0);
  let containerRef: HTMLDivElement | undefined;

  const getIndex = (pos) => {
       for ( let i = 0 ; i < props.padTop.length; i++)  {
                if ( pos < props.padTop[i] ) {
                   return i
		}
        }
       return props.padTop.length
  }
/*
  const gei = (pos) => {
       for ( let i = 0 ; i < props.padTop.length; i++)  {
                if ( pos < props.padTop[i] ) {
                   return i
		}
        }
       return props.padTop.length
  }
*/
  const virtualizer = createMemo(() => {
    const data = props.data;
    const totalItems = data.length;
    const buffer = 50; // レンダリングする範囲の前後のバッファ
    const rowHeight = props.rowHeight!;

    const startIndex = Math.max(
      0,
      //Math.floor(scrollTop() / rowHeight) - buffer
      Math.floor( getIndex( scrollTop() )) - buffer
    );

    /*
    console.log(">>>",
      (scrollTop() + containerHeight()) / rowHeight, "|||",
      gei(scrollTop() + containerHeight())
	       )
	*/
    const endIndex = Math.min(
      totalItems,
      //Math.ceil((scrollTop() + containerHeight()) / rowHeight) + buffer
      Math.ceil( getIndex( scrollTop() + containerHeight()) )   + buffer
    );


    const row_index = [];
    for (let i = startIndex; i < endIndex; i++) {
      row_index.push( i );
    }


    return {
      startIndex,
      endIndex,
      row_index,
      //paddingTop: startIndex * rowHeight,
      //paddingBottom: (totalItems - endIndex) * rowHeight,
      paddingTop:     props.padTop[startIndex] ,
      paddingBottom:  props.padBottom[endIndex] ,
    };
  });

  const handleSort = (key: keyof T, event: MouseEvent) => {
    const isShiftPressed = event.shiftKey;
    setSortConfig((prevConfig) => {
      if (!isShiftPressed) {
        const isAlreadySingleSort =
          prevConfig.length === 1 && prevConfig[0].key === key;
        if (isAlreadySingleSort) {
          return prevConfig[0].direction === "asc"
            ? [{ key, direction: "desc" }]
            : [];
        }
        return [{ key, direction: "asc" }];
      } else {
        const newConfig = [...prevConfig];
        const existingSortIndex = newConfig.findIndex(
          (item) => item.key === key
        );
        if (existingSortIndex > -1) {
          if (newConfig[existingSortIndex].direction === "asc") {
            newConfig[existingSortIndex].direction = "desc";
          } else {
            newConfig.splice(existingSortIndex, 1);
          }
        } else {
          newConfig.push({ key, direction: "asc" });
        }
        return newConfig;
      }
    });
  };
  const handleScroll = (e: Event) => {
    setScrollTop((e.target as HTMLElement).scrollTop);
  };

  onMount(() => {
    if (!containerRef) return;

    const resizeObserver = new ResizeObserver((entries) => {
      setContainerHeight(entries[0].contentRect.height);
    });
    resizeObserver.observe(containerRef);
    console.log("containerRef height", containerRef.clientHeight);
    setContainerHeight(containerRef.clientHeight);

    return () => resizeObserver.disconnect();
  });

  return {
    setContainerRef: (el: HTMLDivElement) => (containerRef = el),
    virtualizer,
    handleScroll,
  };
};
