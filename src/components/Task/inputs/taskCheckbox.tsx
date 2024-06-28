import { memo, useState } from 'react';
import { AnswerType } from '../../../types/AnswerType';

interface ITaskCheckBoxProp {
  onChange: (value: AnswerType | null) => void
  variants: string[];
}

export const TaskCheckBoxes = memo((props: ITaskCheckBoxProp) => {
  const {
    onChange, variants,
  } = props;

  const [value, setValue] = useState<number[] | null>(null);
  return (
    <>
      {variants.map((variant, variantsIndex) => (
        <label key={variant}>
          <input
            placeholder="ваш ответ"
            name="answer"
            type="checkbox"
            onChange={
          (event) => {
            if (event.target.checked && !Array.isArray(value)) {
              setValue([variantsIndex]);
              onChange([variantsIndex]);
            } else if (event.target.checked && Array.isArray(value)) {
              setValue([...value, variantsIndex]);
              onChange([...value, variantsIndex]);
            } else if (!event.target.checked && Array.isArray(value) && (value.length === 1)) {
              setValue(null);
              onChange(null);
            } else if (!event.target.checked && Array.isArray(value)) {
              setValue([...value.filter((item) => item !== variantsIndex)]);
              onChange([...value.filter((item) => item !== variantsIndex)]);
            }
          }
        }
          />
          {variant}
        </label>
      ))}
    </>
  );
});
