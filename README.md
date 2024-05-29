# File converter

This repo contains web-app for file convertion

## What is the main advantage of this solution ?

## Convertion does not require server and going locally on your browser utilizing abilities of WASM

WASM binary built using rust and Shiva crate.

To start using you need to pull repository and run next commands:

```
cd converter_wasm/
wasm-pack build --target web
```

Then copy *converter_wasm_bg.wasm.d.ts* and *converter_wasm_bg.wasm* to **converter_front/public** directory

Run frontend with `npm run dev` and  enjoy :))
