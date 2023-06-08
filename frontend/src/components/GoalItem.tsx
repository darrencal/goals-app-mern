import { FaTrash } from 'react-icons/fa';
import { Goal, deleteGoal } from '../features/goals/goalSlice';
import { useAppDispatch } from '../app/hooks';

interface Props {
  goal: Goal;
}

export default function GoalItem({ goal }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button className='close' onClick={() => dispatch(deleteGoal(goal._id))}>
        <FaTrash />
      </button>
    </div>
  );
}
