import { Goal } from '../features/goals/goalSlice';

interface Props {
  goal: Goal;
}

export default function GoalItem({ goal }: Props) {
  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
    </div>
  );
}
