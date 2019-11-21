use actix_web::{web, Responder};
use serde::Deserialize;

// FIXME: the word type is reserved in Rust, find a way to still name the JSON
// field type.
#[derive(Deserialize)]
pub struct QueryRequest {
    qterm: String,
    qtype: String,
}

pub fn create_query(query: web::Json<QueryRequest>) -> impl Responder {
    format!("Discovered {} of type {}", query.qterm, query.qtype)
}
