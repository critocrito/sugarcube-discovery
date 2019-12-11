use actix_web::{
    web,
    HttpResponse,
    http::StatusCode,
    error::ResponseError
};
use serde::Deserialize;
use rusqlite::{params, Connection, Error as SqliteError, ErrorCode};

#[derive(Deserialize)]
pub struct QueryRequest {
    #[serde(rename = "term")]
    query_term: String,
    #[serde(rename = "type")]
    query_type: String,
}

#[derive(Fail, Debug)]
pub enum CreateRejected {
    #[fail(display = "This query already exists.")]
    QueryExists,
    #[fail(display = "Datastore error: {}.", _0)]
    DatastoreError(String),
    #[fail(display = "General error")]
    GeneralError,
}

impl ResponseError for CreateRejected {
    fn error_response(&self) -> HttpResponse {
        match *self {
            CreateRejected::QueryExists => HttpResponse::new(StatusCode::BAD_REQUEST),
            CreateRejected::DatastoreError(_) => HttpResponse::new(StatusCode::INTERNAL_SERVER_ERROR),
            CreateRejected::GeneralError => HttpResponse::new(StatusCode::INTERNAL_SERVER_ERROR),
        }
    }
}

impl From<SqliteError> for CreateRejected {
    fn from(error: SqliteError) -> Self {
        match error {
            SqliteError::SqliteFailure(ref e, Some(ref s)) => {
                println!("{:?} -> {:?}", e, s.to_string());
                match e.code {
                    ErrorCode::ConstraintViolation => CreateRejected::QueryExists,
                    _ => CreateRejected::DatastoreError(s.to_string()),
                }
            },
            _ => CreateRejected::GeneralError,
        }

    }
}

pub fn create_query(query: web::Json<QueryRequest>) -> Result<HttpResponse, CreateRejected> {
    let path = "./sugarcube.db";
    let conn = Connection::open(&path)?;
    println!("{}, {}", query.query_type, query.query_term);
    conn.execute(
        "INSERT INTO queries (type, term) VALUES (?1, ?2)",
        params![query.query_type, query.query_term],
    )?;
    println!("Discovered {} of type {}", query.query_term, query.query_type);
    Ok(HttpResponse::Created().finish())
}
