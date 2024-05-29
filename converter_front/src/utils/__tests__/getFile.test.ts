import { FileFormat } from "converter_wasm";
import { FILE_OUTPUT_FORMAT, getFile } from "../getFile";
import { describe, expect, it } from "@jest/globals";

describe("getFile", () => {
  it("getFile should work correctly", () => {
    const ffi = "text/markdown";
    const ffo = FileFormat.Xml;

    const file = new Uint8Array([1, 2, 3]);
    const result = getFile(file, ffo, ffi);
    const blob = new Blob([file.buffer], { type: ffi });

    expect(result.name).toBe(FILE_OUTPUT_FORMAT[ffo]);
    expect(result.file).toStrictEqual(blob);
  });
});
