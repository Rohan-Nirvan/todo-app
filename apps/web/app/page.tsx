import Image, { type ImageProps } from "next/image";
import { Button } from "@todo-app/ui/button";
import styles from "./page.module.css";
import TodoList from "./_components/List";
import TodoForm from "./_components/Form";
import { checkDbPromise } from "../lib";

export default async function Home() {
  await checkDbPromise();
  console.log('Home dbPromise resolved.');
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TodoList />
        <TodoForm />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
