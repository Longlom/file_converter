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

import cn from "classnames";

import init, { convert } from "converter_wasm";
import { ALLOWED_FILES, FILE_FORMAT, ensureInputFile, getFile } from "@/utils/getFile";

const INACTIVE_TEXT = "Drag and drop file here";
const ACTIVE_TEXT = "Drop HERE";

export type ConvertProps = {
  convert: (
    file: Uint8Array,
    input_format: FileFormat,
    output_format: FileFormat
  ) => Uint8Array;
};


export default function Converter() {
  const [file, setFile] = useState<File>();
  const [outputFormat, setOutputFormat] = useState<FileFormat>(FileFormat.Html);
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
    console.log(file?.type);
    if (ALLOWED_FILES.some((fileName) => file?.type.includes(fileName))) {
      setFile(file);
    }
    setDragCount(0);
  };

  const onConvertClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const inputFileFormat = file?.type || "";

    if (file && ensureInputFile(inputFileFormat)) {
      file.arrayBuffer().then((buffer) => {
        const uint = new Uint8Array(buffer);
        try {
          const result = convert(
            uint,
            FILE_FORMAT[inputFileFormat],
            outputFormat
          );

          const blob = getFile(result, outputFormat, inputFileFormat);
          const url = URL.createObjectURL(blob.file);
          const name = `${file?.name.split(".")[0]}.${blob.name}`;
          const a = document.createElement("a");
          a.href = url;
          a.download = name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch (e) {
          console.error("Error happened wile trying convert file - ", e);
        }
      });
    }
  };

  const onSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const type = e.target?.value;
    if (type && ensureInputFile(type)) {
      const ff = FILE_FORMAT[type];

      setOutputFormat(ff);
    }
  };

  useEffect(() => {
    if (dragCount) {
      setText(ACTIVE_TEXT);
    } else {
      setText(INACTIVE_TEXT);
    }
  }, [dragCount]);

  useEffect(() => {
    init("http://localhost:3000/converter_wasm_bg.wasm").then((result) => {
      console.log(result);
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
        <div
          className={cn(
            "w-32 h-32 flex-1 text-center",
            styles.convertButtonContainer
          )}
        >
          <button
            disabled={!Boolean(file)}
            onClick={onConvertClick}
            className={styles.convertButton}
          >
            Convert
          </button>
        </div>
        <div className="w-32 h-32 flex-1 text-center">
          {file ? (
            <>
              <label className={styles.formatLabel} htmlFor="format">
                Выберите в какой формат конвертировать
              </label>
              <select
                className={styles.formatSelect}
                name="format"
                id="format"
                onChange={onSelectChange}
                defaultValue={ALLOWED_FILES[0]}
              >
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
