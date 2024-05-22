"use server"

import Converter from "@/components/Converter";
import styles from "./style.module.css";



// import {convert} from "../../../converter_wasm/pkg/converter_wasm"

export default async function Home() {
  // const exports = await import("../../converter_wasm_bg.wasm");
  // const { } = exports;
  // console.log(add(1, 2));



  return (
    <main className="flex min-h-screen flex-col p-15">
      <h1 className="mt-6 text-5xl m-auto">File converter</h1>
      <Converter/>
    </main>
  );
}
;
