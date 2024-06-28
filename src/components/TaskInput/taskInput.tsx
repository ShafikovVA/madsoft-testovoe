import { memo, useMemo } from 'react';
import { useTaskByIndex } from '../../hooks/useTasks';
import { AnswerType } from '../../types/AnswerType';
import { TaskCheckBoxes } from '../Task/inputs/taskCheckbox';

interface TaskInputProps {
  index: number;
  value?: AnswerType;
  isResult?: boolean;
  onChange: (value: AnswerType | null) => void;
}

export const TaskInput = memo((props: TaskInputProps) => {
  const {
    index, value, isResult, onChange,
  } = props;
  const { task } = useTaskByIndex(index);
  const isDisabled = useMemo(() => (!!value || isResult), [value, isResult]);
  return (
    <>
      {
        task.type === 'short' && (isDisabled) && (
          <input disabled value={value ? value as string : ''} type="text" />
        )
      }
      {
        task.type === 'short' && (!isDisabled) && (
          <input onChange={(event) => onChange(event.target.value)} type="text" />
        )
      }
      {
        task.type === 'detailed' && (isDisabled) && (
          <textarea disabled value={value ? value as string : ''} />
        )
      }
      {
        task.type === 'detailed' && (!isDisabled) && (
          <textarea onChange={(event) => onChange(event.target.value)} placeholder="ваш ответ" />
        )
      }
      {
        task.type === 'single' && (isDisabled) && (
          <>
            {task.variants.map((variant, variantsIndex) => (
              <label key={variant}>
                <input disabled name="answer" type="radio" checked={value !== undefined ? value === variantsIndex : false} />
                {variant}
              </label>
            ))}
          </>
        )
      }
      {
        task.type === 'single' && (!isDisabled) && (
          <>
            {task.variants.map((variant, variantsIndex) => (
              <label key={variant}>
                <input placeholder="ваш ответ" name="answer" type="radio" onClick={() => onChange(variantsIndex)} />
                {variant}
              </label>
            ))}
          </>
        )
      }
      {
        task.type === 'multiple' && (isDisabled) && (
          <>
            {task.variants.map((variant, variantsIndex) => (
              <label key={variant}>
                <input
                  name="answer"
                  type="checkbox"
                  checked={value !== undefined && (Array.isArray(value)) ? value.includes(variantsIndex) : false}
                  disabled
                />
                {variant}
              </label>
            ))}
          </>
        )
      }
      {
        task.type === 'multiple' && (task.variants) && (!isDisabled) && (
          <TaskCheckBoxes onChange={(checkboxValue) => onChange(checkboxValue)} variants={task.variants} />
        )
      }
    </>
  );
});
