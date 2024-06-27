import { memo, useMemo } from 'react';
import { AnswerType } from '../../types/AnswerType';

interface TaskInputProps {
  type: 'single' | 'multiple' | 'short' | 'detailed';
  onChange: (e: AnswerType | null)=>void;
  variants: string[];
  answer: AnswerType | null;
  value?: AnswerType;
  isResult?: boolean;
}

export const TaskInput = memo((props: TaskInputProps) => {
  const {
    type, variants, onChange, answer, value, isResult,
  } = props;
  console.log(answer);
  const isDisabled = useMemo(() => (!!value || isResult), [value, isResult]);
  return (
    <>
      {
        type === 'short' && (isDisabled) && (
          <input disabled value={value ? value as string : ''} type="text" />
        )
      }
      {
        type === 'short' && (!isDisabled) && (
          <input onChange={(event) => onChange(event.target.value)} type="text" />
        )
      }
      {
        type === 'detailed' && (isDisabled) && (
          <textarea disabled value={value ? value as string : ''} />
        )
      }
      {
        type === 'detailed' && (!isDisabled) && (
          <textarea onChange={(event) => onChange(event.target.value)} placeholder="ваш ответ" />
        )
      }
      {
        type === 'single' && (isDisabled) && (
          <>
            {variants.map((variant, index) => (
              <label key={variant}>
                <input disabled name="answer" type="radio" checked={value ? value === index : false} />
                {variant}
              </label>
            ))}
          </>
        )
      }
      {
        type === 'single' && (!isDisabled) && (
          <>
            {variants.map((variant, index) => (
              <label key={variant}>
                <input placeholder="ваш ответ" name="answer" type="radio" onClick={() => onChange(index)} />
                {variant}
              </label>
            ))}
          </>
        )
      }
      {
        type === 'multiple' && (isDisabled) && (
          <>
            {variants.map((variant, index) => (
              <label key={variant}>
                <input
                  name="answer"
                  type="checkbox"
                  checked={value && (Array.isArray(value)) ? value[index] === index : false}
                  disabled
                />
                {variant}
              </label>
            ))}
          </>
        )
      }
      {
        type === 'multiple' && (variants) && (!isDisabled) && (
          <>
            {variants.map((variant, index) => (
              <label key={variant}>
                <input
                  placeholder="ваш ответ"
                  name="answer"
                  type="checkbox"
                  onChange={
                  (event) => {
                    if (event.target.checked && !Array.isArray(answer)) {
                      onChange([index]);
                    } else if (event.target.checked && Array.isArray(answer)) {
                      onChange([...answer, index]);
                    } else if (!event.target.checked && Array.isArray(answer) && (answer.length === 1)) {
                      onChange(null);
                    } else if (!event.target.checked && Array.isArray(answer)) {
                      onChange([...answer.filter((item) => item !== index)]);
                    // eslint-disable-next-line no-dupe-else-if
                    }
                  }
                }
                />
                {variant}
              </label>
            ))}
          </>
        )
      }
    </>
  );
});
