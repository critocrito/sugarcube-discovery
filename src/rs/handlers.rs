use actix_web::{web, HttpResponse};
use serde::Deserialize;
use rusqlite::{params, Connection};

#[derive(Deserialize)]
pub struct QueryRequest {
    #[serde(rename = "term")]
    query_term: String,
    #[serde(rename = "type")]
    query_type: String,
}

pub fn create_query(query: web::Json<QueryRequest>) -> HttpResponse {
    let path = "./sugarcube.db";
    let conn = Connection::open(&path).unwrap();
    conn.execute(
        "INSERT INTO queries (type, term) VALUES (?1, ?2)",
        params![query.query_type, query.query_term],
    ).unwrap();
    println!("Discovered {} of type {}", query.query_term, query.query_type);
    HttpResponse::Created().finish()
}
