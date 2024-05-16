"use client";

import Image from "next/image";
import styles from "./style.module.css";
import { DragEventHandler, useRef, useState } from "react";

const INACTIVE_TEXT = "Drag and drop file here";
const ACTIVE_TEXT = "Drop HERE";

export default function Home() {
  const [file, setFile] = useState([]);
  const dragnDropEl = useRef<HTMLDivElement | null>(null);

  const [text, setText] = useState(INACTIVE_TEXT);

  const onDropHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    console.log("HJELL");
  };

  const onDragOverHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    console.log("onDragOverHandler", e.target);

  };

  const onDragStartHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setText(ACTIVE_TEXT);
    console.log("onDragStartHandler", e.target);
  };

  const onDragEndHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("onDragEndHandler", e.target);

    let target = e.target as Node;

    setText(INACTIVE_TEXT);
  };

  return (
    <main className="flex min-h-screen flex-col p-15">
      <h1 className="mt-6 text-5xl m-auto">File converter</h1>

      <div className="flex justify-between items-center flex-1 p-10">
        <div
          className="outline-1 outline-dashed w-32 h-80 flex-1 rounded-md flex flex-col justify-center"
          onDrop={onDropHandler}
          onDragOver={onDragOverHandler}
          onDragEnter={onDragStartHandler}
          onDragLeave={onDragEndHandler}
          ref={dragnDropEl}
        >
          <div className="w-fit m-auto text-center">
            <p>{text}</p>
            <input
              type="file"
              hidden
              id="file"
              onChange={() => {}}
              accept=".pdf,.docx,.md,.html"
            />
            {/* <label htmlFor="file" className={styles.browseBtn}>
              Browse file
            </label> */}
          </div>
        </div>
        <div className="w-32 h-32 flex-1"></div>
        <div className="w-32 h-32 flex-1">ads</div>
      </div>
    </main>
  );
}
``;
