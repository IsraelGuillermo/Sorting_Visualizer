export const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
export const handleSliderChange = (
  event: Event,
  newValue: number | number[],
  setValue: (value: number | number[]) => void
) => {
  event.preventDefault();
  setValue(newValue);
};
