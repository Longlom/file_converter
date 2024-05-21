"use client";

import Image from "next/image";
import styles from "./style.module.css";
import {
  ChangeEventHandler,
  DragEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

const INACTIVE_TEXT = "Drag and drop file here";
const ACTIVE_TEXT = "Drop HERE";

const ALLOWED_FILES = ["markdown", "pdf"];

export default function Home() {
  const [file, setFile] = useState<File>();
  const [dragCount, setDragCount] = useState(0);
  const dragnDropEl = useRef<HTMLDivElement | null>(null);

  const [text, setText] = useState(INACTIVE_TEXT);

  const onDropHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    console.log(file.name);
    if (ALLOWED_FILES.some((fileName) => file.type.includes(fileName))) {
      setFile(file);
    }
    setDragCount(0);
  };

  const onDragOverHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    // console.log("onDragOverHandler", e.target);
  };

  const onDragStartHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCount((prevCount) => prevCount + 1);
  };

  const onDragEndHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCount((prevCount) => prevCount - 1);
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const file = e.target?.files?.[0];
    if (ALLOWED_FILES.some((fileName) => file?.type.includes(fileName))) {
      setFile(file);
    }
    setDragCount(0);
  };

  useEffect(() => {
    if (dragCount) {
      setText(ACTIVE_TEXT);
    } else {
      setText(INACTIVE_TEXT);
    }
  }, [dragCount]);

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
            <p>{file ? `File ${file.name} is saved` : "No file is dropped"}</p>
            <p>{text}</p>
            <input
              type="file"
              hidden
              id="file"
              onChange={onInputChange}
              accept=".pdf,.docx,.md,.html"
            />
            <label htmlFor="file" className={styles.browseBtn}>
              Browse file
            </label>
          </div>
        </div>
        <div className="w-32 h-32 flex-1"></div>
        <div className="w-32 h-32 flex-1 text-center">
          {file ? (
            <>
              <label className={styles.formatLabel} htmlFor="format">
                Выберите в какой формат конвертировать
              </label>
              <select className={styles.formatSelect} name="format" id="format">
                {ALLOWED_FILES.map((allowedFile, i) => (
                  <option key={i} value={allowedFile}>
                    {allowedFile}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
}
``;
