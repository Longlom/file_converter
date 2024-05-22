"use client";

import { FileFormat } from "converter_wasm";
import styles from "./style.module.css";
import {
  ChangeEventHandler,
  DragEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

import init, { convert } from "converter_wasm";

const INACTIVE_TEXT = "Drag and drop file here";
const ACTIVE_TEXT = "Drop HERE";

const ALLOWED_FILES = ["application/pdf", "application/html", "text/markdown", "application/docx"];

const FILE_FORMAT = {
  'application/pdf': FileFormat.Pdf,
  'application/html': FileFormat.Html,
  'text/markdown': FileFormat.Markdown,
  'application/docx': FileFormat.Docx,
} as const;

export type ConvertProps = {
  convert: (
    file: Uint8Array,
    input_format: FileFormat,
    output_format: FileFormat
  ) => Uint8Array;
};

function ensureType(typeFormat: string): typeFormat is  keyof typeof FILE_FORMAT {
  return typeFormat in FILE_FORMAT;
}


export default function Converter() {
  const [file, setFile] = useState<File>();
  const [dragCount, setDragCount] = useState(0);
  const dragnDropEl = useRef<HTMLDivElement | null>(null);

  const [text, setText] = useState(INACTIVE_TEXT);


  const onDropHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    console.log(file.type);
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
    console.log(file?.type)
    if (ALLOWED_FILES.some((fileName) => file?.type.includes(fileName))) {
      setFile(file);
    }
    setDragCount(0);
  };

  const onConvertClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("button clicked");
    console.log(file);
    const inputFileFormat = file?.type || "";

    if (file && ensureType(inputFileFormat))  {
      file.arrayBuffer().then(buffer => {
        const uint = new Uint8Array(buffer);
        console.log(uint)
        const result = convert(uint, FILE_FORMAT[inputFileFormat], FileFormat.Pdf );

        console.log(result);
      })
    }


  } 

  useEffect(() => {
    if (dragCount) {
      setText(ACTIVE_TEXT);
    } else {
      setText(INACTIVE_TEXT);
    }
  }, [dragCount]);

  useEffect(() => {
    init("http://localhost:3000/converter_wasm_bg.wasm").then((result) => {
      console.log(result)
    });
  }, []);
  return (
    <>
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
        <div className="w-32 h-32 flex-1">
          <button onClick={onConvertClick}>Convert</button>
        </div>
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
    </>
  );
}
``;
