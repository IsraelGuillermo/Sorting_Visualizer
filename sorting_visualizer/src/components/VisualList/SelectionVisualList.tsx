import { useEffect, useState } from 'react';
import { Bar } from './Bar';

interface Props {
  values?: string[];
}

export function SelectionVisualList({ values }: Props) {
  useEffect(() => {
    selectionSort();
  });
  const [i, setI] = useState<number>(0);
  const [j, setj] = useState<number>();
  const [completed, setCompleted] = useState(false);

  const [sorted, setSorted] = useState(values);

  const arr = values?.slice(0) || [];
  let min = i;
  const step = j;
  console.log(step);
  const delay = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };
  const tempoArr = arr.slice(0);
  const swap = (arr: string[], idx1: number, idx2: number) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  const selectionSort = async () => {
    for (let i = 0; i < arr.length; i++) {
      setI(i);

      for (let j = i + 1; j < arr.length; j++) {
        if (i !== min) {
          setj(j);
          if (parseInt(arr[j]) < parseInt(arr[min])) {
            min = j;
          }
          swap(tempoArr, i, min);
          setSorted(tempoArr);
        }

        await delay(400);
      }
    }
    setCompleted(true);
  };

  return (
    <>
      {values?.map((item, index) => (
        <Bar
          completed={completed}
          key={index}
          height={parseInt(item)}
          left={sorted && sorted.indexOf(item) * 20}
          selected={
            sorted?.indexOf(item) === min || sorted?.indexOf(item) === step
          }
        />
      ))}
    </>
  );
}
