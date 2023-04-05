import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { BubbleVisualList } from './BubbleVisualList';
import { SelectionVisualList } from './SelectionVisualList';

interface Props {
  values?: string[];
}

const useStyles = makeStyles(() => ({
  container: {
    margin: '0, auto'
  }
}));
export function VisualList({ values }: Props) {
  const [sortingType, setSortingType] = useState<string>();
  const classes = useStyles();

  return (
    <Box>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Box
          position='relative'
          flexDirection='row'
          mb={3}
          className={classes.container}
          width={values && values?.length * 20}
          height={200}
        >
          {sortingType === 'bubble' && <BubbleVisualList values={values} />}
          {sortingType === 'selection' && (
            <SelectionVisualList values={values} />
          )}
        </Box>
      </Box>
      <Box my={4}>
        <Button
          onClick={() => {
            setSortingType('bubble');
          }}
        >
          Bubble Sort
        </Button>
        <Button
          onClick={() => {
            setSortingType('selection');
          }}
        >
          Selection Sort
        </Button>
      </Box>
    </Box>
  );
}
