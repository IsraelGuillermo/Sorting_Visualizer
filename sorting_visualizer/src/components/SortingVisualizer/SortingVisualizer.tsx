import { delay } from '@/utils/genericFunctions';
import { Box, Button, Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getMergeSortAnimations } from '../../utils/sortingAlgorithms';

import styles from './SortingVisualizer.module.css';
export function SortingVisualizer() {
  const primaryColor = '#83c5be';
  const secondaryColor = '#FF7878';
  const completedColor = '#489fb5';
  const [completed, setCompleted] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [array, setArray] = useState<number[]>([]);
  const [value, setValue] = useState<number | number[]>(50);
  const numberOfArrayBars = value;
  const AnimationSpeed =
    numberOfArrayBars < 75 ? 25 : numberOfArrayBars > 200 ? 5 : 10;
  useEffect(() => {
    const resetArray = () => {
      const numArray: number[] = [];
      setIsSorting(false);
      for (let i = 0; i < numberOfArrayBars; i++) {
        numArray.push(generateRanInt(5, 730));
      }
      setArray(numArray);
    };
    resetArray();
  }, [value]);

  const resetArray = () => {
    setIsSorting(false);
    setCompleted(false);
    const numArray: number[] = [];

    for (let i = 0; i < numberOfArrayBars; i++) {
      numArray.push(generateRanInt(5, 730));
    }
    setArray(numArray);
  };
  const generateRanInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleMergeSort = async () => {
    await setIsSorting(true);
    const animations = getMergeSortAnimations(array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(
        styles.arrayBar
      ) as HTMLCollectionOf<HTMLElement>;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneidx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneidx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? secondaryColor : primaryColor;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * AnimationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight / 1.75}px`;

          setCompleted(i === animations.length - 1);
        }, i * AnimationSpeed);
      }
    }
  };
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleBubbleSort = () => {
    const bubbleSortHelper = async (arr: number[]) => {
      setIsSorting(true);
      const sortedArr = arr.slice();
      if (sortedArr.length === 1) return sortedArr;
      const arrayBars = document.getElementsByClassName(
        styles.arrayBar
      ) as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < sortedArr.length; i++) {
        for (let j = 0; j < sortedArr.length - i - 1; j++) {
          arrayBars[j].style.backgroundColor = secondaryColor;
          arrayBars[j + 1].style.backgroundColor = secondaryColor;
          await delay(AnimationSpeed);

          if (sortedArr[j] > sortedArr[j + 1]) {
            const tempMaxHeight = arrayBars[j].style.height;
            const tempSmallerHeight = arrayBars[j + 1].style.height;
            arrayBars[j].style.height = tempSmallerHeight;
            arrayBars[j + 1].style.height = tempMaxHeight;
            [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
          }
          arrayBars[j].style.backgroundColor = primaryColor;
          arrayBars[j + 1].style.backgroundColor = primaryColor;
        }
      }
      setCompleted(true);
      return;
    };
    bubbleSortHelper(array);
  };

  const handleSelectionSort = () => {
    const selectionSortHelper = async (arr: number[]) => {
      setIsSorting(true);
      const sortedArr = arr.slice();
      console.log({ arr });
      if (sortedArr.length === 1) return sortedArr;
      const arrayBars = document.getElementsByClassName(
        styles.arrayBar
      ) as HTMLCollectionOf<HTMLElement>;
      const n = sortedArr.length;

      for (let i = 0; i < n; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
          arrayBars[min].style.backgroundColor = secondaryColor;
          arrayBars[j].style.backgroundColor = secondaryColor;
          await delay(AnimationSpeed);
          if (sortedArr[j] < sortedArr[min]) {
            arrayBars[min].style.backgroundColor = primaryColor;
            min = j;
            arrayBars[i].style.backgroundColor = primaryColor;
            arrayBars[min].style.backgroundColor = secondaryColor;
          }
          arrayBars[i].style.backgroundColor = primaryColor;
          arrayBars[min].style.backgroundColor = primaryColor;
          arrayBars[j].style.backgroundColor = primaryColor;
        }
        if (min !== i) {
          const temp = sortedArr[i];
          const tempMinHeight = arrayBars[i].style.height;
          const tempMaxHeight = arrayBars[min].style.height;
          sortedArr[i] = sortedArr[min];
          sortedArr[min] = temp;
          arrayBars[min].style.height = tempMinHeight;
          arrayBars[i].style.height = tempMaxHeight;
        }
      }

      console.log(sortedArr);
      setCompleted(true);
      return sortedArr;
    };
    selectionSortHelper(array);
  };

  return (
    <>
      <Box className={styles.titleContainer}>
        <Typography variant='h3' style={{ marginLeft: 50, color: '#FBF8F1' }}>
          Algorithm Visualizer
        </Typography>
      </Box>
      <div className={styles.container}>
        <div className={styles.arrayContainer}>
          {array.map((value, idx) => (
            <div
              className={styles.arrayBar}
              key={idx}
              style={{
                height: `${value / 1.75}px`,
                backgroundColor: completed ? completedColor : primaryColor
              }}
            />
          ))}
        </div>
        <Box display='flex' justifyContent='center'>
          <Box className={styles.buttonContainer} style={{ marginBottom: 30 }}>
            <Typography
              variant='body1'
              className={styles.slider}
              id='discrete-slider'
              gutterBottom
            >
              Adjust Size and Speed of Visualizer
            </Typography>
            <Slider
              className={styles.slider}
              disabled={isSorting}
              value={value}
              onChange={handleSliderChange}
              min={10}
              max={200}
            />
            <Button
              className={styles.button}
              variant='contained'
              disabled={isSorting && !completed}
              onClick={resetArray}
            >
              Generate New Array
            </Button>
            <Button
              className={styles.button}
              variant='contained'
              disabled={isSorting}
              onClick={handleMergeSort}
            >
              Merge Sort
            </Button>
            <Button
              className={styles.button}
              variant='contained'
              disabled={isSorting}
              onClick={handleBubbleSort}
            >
              Bubble Sort
            </Button>
            <Button
              className={styles.button}
              variant='contained'
              disabled={isSorting}
              onClick={handleSelectionSort}
            >
              Selection Sort
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}
