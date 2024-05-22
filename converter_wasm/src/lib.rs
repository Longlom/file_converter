mod utils;

use std::collections::HashMap;

use wasm_bindgen::prelude::*;

use shiva::{core::TransformerTrait, *};

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum FileFormat {
    Pdf = 0,
    Markdown = 1,
    Docx = 2,
    Html = 3,
}

#[wasm_bindgen]
pub fn convert(file: Vec<u8>, input_format: FileFormat, output_format: FileFormat) -> Vec<u8> {
    let parsed_file;

    match input_format {
        FileFormat::Pdf => {
            parsed_file = pdf::Transformer::parse(&file.into(), &HashMap::new()).unwrap();
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
    }

    match output_format {
        FileFormat::Pdf => {
            let generated = pdf::Transformer::generate(&parsed_file).unwrap();

            return generated.0.to_vec();
        }
        FileFormat::Markdown => {
            let generated = markdown::Transformer::generate(&parsed_file).unwrap();

            return generated.0.to_vec();
        }
        FileFormat::Docx => {
            let generated = docx::Transformer::generate(&parsed_file).unwrap();
            return generated.0.to_vec();
        }
        FileFormat::Html => {
            let generated = html::Transformer::generate(&parsed_file).unwrap();
            return generated.0.to_vec();
        }
    }
}
