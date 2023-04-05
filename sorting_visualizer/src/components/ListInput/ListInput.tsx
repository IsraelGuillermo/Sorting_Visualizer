import { Box, Button } from '@mui/material';

interface Props {
  input: string;
  setInput: (str: string) => void;
  values: string[];
  setValues: (arr: string[]) => void;
  setSubmitted: (value: boolean) => void;
}

export function ListInput({ values, setValues, setSubmitted }: Props) {
  function generateArray(value: number) {
    const randomArr: string[] = [];
    const min = 15;
    const max = 150;
    const difference = max - min;
    for (let i = 0; i <= value; i++) {
      const randomNum = Math.floor(Math.random() * difference).toString();

      if (!randomArr.includes(randomNum) && parseInt(randomNum) > 15)
        randomArr.push(randomNum);
    }
    randomArr.length > 5 && setValues(randomArr);
  }
  return (
    <>
      <Box display='flex' justifySelf='center' alignSelf='center'>
        <Box display='flex' flexDirection='column' my={2}>
          {values.length > 0 && (
            <Box>Array has been created, submit to continue</Box>
          )}
          <Button
            onClick={() => {
              generateArray(Math.floor(Math.random() * 40));
            }}
          >
            Generate Random List
          </Button>
          <Button
            onClick={() => {
              if (values.length > 0) {
                setSubmitted(true);
              }
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}
