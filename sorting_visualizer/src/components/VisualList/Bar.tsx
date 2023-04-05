import { Box } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
export type Props = {
  left?: number;
  right?: number;
  height: number;
  completed: boolean;
  selected?: boolean;
  minValue?: boolean;
};

const useStyles = makeStyles({
  root: {
    backgroundColor: '#83c5be',
    borderColor: '#fff1e6',
    borderWidth: 0.5,
    border: 'solid',
    transition: 'all .5s'
  },
  root2: {
    backgroundColor: '#e76f51',
    borderColor: '#fff1e6',
    borderWidth: 0.5,
    border: 'solid',
    transition: 'all .5s'
  },
  root3: {
    backgroundColor: '#2a9d8f',
    borderColor: '#fff1e6',
    borderWidth: 0.5,
    border: 'solid',
    transition: 'all .5s'
  },
  root4: {
    backgroundColor: 'red',
    borderColor: '#fff1e6',
    borderWidth: 0.5,
    border: 'solid',
    transition: 'all .5s'
  }
});

export function Bar({
  completed,
  height,
  selected,
  left,
  right,
  minValue
}: Props) {
  const classes = useStyles();
  return (
    <Box
      bottom={0}
      position='absolute'
      left={left}
      right={right}
      height={height}
      width={20}
      className={classNames(
        completed
          ? classes.root3
          : selected
          ? classes.root
          : minValue
          ? classes.root4
          : classes.root2
      )}
    />
  );
}
