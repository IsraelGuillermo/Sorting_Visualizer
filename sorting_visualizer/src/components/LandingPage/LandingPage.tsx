import { Box } from '@mui/material';
import { useState } from 'react';
import { ListInput } from '../ListInput';
import { VisualList } from '../VisualList/VisualList';

export function LandingPage() {
  const [input, setInput] = useState('');
  const [values, setValues] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  return (
    <Box
      height={'100vh'}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      {submitted ? (
        <VisualList values={values} />
      ) : (
        <ListInput
          setSubmitted={setSubmitted}
          input={input}
          setInput={setInput}
          setValues={setValues}
          values={values}
        />
      )}
    </Box>
  );
}
