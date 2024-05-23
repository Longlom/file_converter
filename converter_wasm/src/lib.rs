mod utils;

use std::collections::HashMap;

use wasm_bindgen::prelude::*;

use shiva::{core::TransformerTrait, *};

use crate::utils::set_panic_hook;

extern crate web_sys;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum FileFormat {
    Markdown = 0,
    Docx = 1,
    Html = 2,
    Text = 3,
    Json = 4,
    Xml = 5,
    Csv = 6,
}



#[wasm_bindgen]
pub fn convert(file: Vec<u8>, input_format: FileFormat, output_format: FileFormat) -> Vec<u8> {
    set_panic_hook();
    let parsed_file;
    match input_format {
        FileFormat::Text => {
            parsed_file = text::Transformer::parse(&file.into(), &HashMap::new()).unwrap();
        }
        FileFormat::Markdown => {
            parsed_file = markdown::Transformer::parse(&file.into(), &HashMap::new()).unwrap();
        }
        FileFormat::Docx => {
            parsed_file = docx::Transformer::parse(&file.into(), &HashMap::new()).unwrap();
        }
        FileFormat::Html => {
            parsed_file = html::Transformer::parse(&file.into(), &HashMap::new()).unwrap();
        }
        FileFormat::Json => {
            parsed_file = json::Transformer::parse(&file.into(), &HashMap::new()).unwrap();
        }
        FileFormat::Xml => {
            parsed_file = xml::Transformer::parse(&file.into(), &HashMap::new()).unwrap();
        }
        FileFormat::Csv => {
            parsed_file = csv::Transformer::parse(&file.into(), &HashMap::new()).unwrap();
        }
    }

    match output_format {
        FileFormat::Text => {
            let generated = match text::Transformer::generate(&parsed_file) {
                Ok(res) => res,
                Err(err) => {
                    log!(" FileFormat::Text err {:#?}", err);
                    panic!();
                }
            };
            return generated.0.to_vec();
        }
        FileFormat::Markdown => {
            let generated = match markdown::Transformer::generate(&parsed_file) {
                Ok(res) => res,
                Err(err) => {
                    log!(" FileFormat::Markdown err {:#?}", err);
                    panic!();
                }
            };
            return generated.0.to_vec();
        }
        FileFormat::Docx => {
            let generated = match docx::Transformer::generate(&parsed_file) {
                Ok(res) => res,
                Err(err) => {
                    log!(" FileFormat::Docx err {:#?}", err);
                    panic!();
                }
            };
            return generated.0.to_vec();
        }
        FileFormat::Html => {
            let generated = match html::Transformer::generate(&parsed_file) {
                Ok(res) => res,
                Err(err) => {
                    log!(" FileFormat::Html err {:#?}", err);
                    panic!();
                }
            };
            return generated.0.to_vec();
        }
        FileFormat::Json => {
            let generated = match json::Transformer::generate(&parsed_file) {
                Ok(res) => res,
                Err(err) => {
                    log!(" FileFormat::Json err {:#?}", err);
                    panic!();
                }
            };
            return generated.0.to_vec();
        }
        FileFormat::Xml => {
            let generated = match xml::Transformer::generate(&parsed_file) {
                Ok(res) => res,
                Err(err) => {
                    log!(" FileFormat::Xml err {:#?}", err);
                    panic!();
                }
            };
            return generated.0.to_vec();
        }
        FileFormat::Csv => {
            let generated = match csv::Transformer::generate(&parsed_file) {
                Ok(res) => res,
                Err(err) => {
                    log!(" FileFormat::Csv err {:#?}", err);
                    panic!();
                }
            };
            return generated.0.to_vec();
        }
    }
}
