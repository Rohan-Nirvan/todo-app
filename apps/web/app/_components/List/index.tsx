import { getList, Todo } from "../../../lib";

export default async function TodoList() {
  const list: Todo[] = await getList();
  return (
    <div>
      TodoList
      {list?.map((todo: Todo) => {
        return <p key={todo?.id}>{todo?.text}</p>;
      })}
    </div>
  );
}
