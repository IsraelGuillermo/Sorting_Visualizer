import { useEffect, useState } from 'react';
import { Bar } from './Bar';

interface Props {
  values?: string[];
}
export function BubbleVisualList({ values }: Props) {
  useEffect(() => {
    bubbleSort();
  }, [values]);
  const [j, setJ] = useState<number>(0);
  const [completed, setCompleted] = useState(false);
  const arr = values?.slice(0) || [];
  const [sorted, setSorted] = useState(values);

  const delay = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const bubbleSort = async () => {
    for (let i = arr.length; i > 0; i--) {
      for (let j = 0; j < i - 1; j++) {
        setJ(j);
        await delay(300);
        if (parseInt(arr[j]) > parseInt(arr[j + 1])) {
          setSorted(arr);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
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
            (sorted && sorted?.indexOf(item) === j) ||
            (sorted && sorted?.indexOf(item) === j + 1)
          }
        />
      ))}
    </>
  );
}
