use actix_web::{
    web,
    HttpResponse,
    http::StatusCode,
    error::ResponseError
};
use serde::Deserialize;
use rusqlite::{params, Connection, Error as SqliteError, ErrorCode};
use validator::{Validate, ValidationError, ValidationErrors};

#[derive(Clone, Deserialize, Debug, Validate)]
pub struct QueryRequest {
    #[validate(url)]
    #[serde(rename = "term")]
    query_term: String,
    #[validate(custom = "validate_query_type")]
    #[serde(rename = "type")]
    query_type: String,
}

#[derive(Fail, Debug)]
pub enum CreateRejected {
    #[fail(display = "This query already exists.")]
    QueryExists,
    #[fail(display = "Validation failed")]
    ValidationError,
    #[fail(display = "Datastore error: {}.", _0)]
    DatastoreError(String),
    #[fail(display = "General error")]
    GeneralError,
}

impl ResponseError for CreateRejected {
    fn error_response(&self) -> HttpResponse {
        match *self {
            CreateRejected::QueryExists => HttpResponse::new(StatusCode::BAD_REQUEST),
            CreateRejected::ValidationError => HttpResponse::new(StatusCode::BAD_REQUEST),
            CreateRejected::DatastoreError(_) => HttpResponse::new(StatusCode::INTERNAL_SERVER_ERROR),
            CreateRejected::GeneralError => HttpResponse::new(StatusCode::INTERNAL_SERVER_ERROR),
        }
    }
}

impl From<SqliteError> for CreateRejected {
    fn from(error: SqliteError) -> Self {
        match error {
            SqliteError::SqliteFailure(ref e, Some(ref s)) => {
                error!("{:?} -> {:?}", e, s.to_string());
                match e.code {
                    ErrorCode::ConstraintViolation => CreateRejected::QueryExists,
                    _ => CreateRejected::DatastoreError(s.to_string()),
                }
            },
            _ => CreateRejected::GeneralError,
        }

    }
}

impl From<ValidationErrors> for CreateRejected {
    fn from(_error: ValidationErrors) -> Self {
        CreateRejected::ValidationError
    }
}

fn validate_query_type(query_type: &str) -> Result<(), ValidationError> {
    println!("{}", query_type);
    if query_type == "facebook_post" ||
        query_type == "youtube_video" ||
        query_type == "youtube_channel" ||
        query_type == "twitter_tweet" ||
        query_type == "twitter_user" ||
        query_type == "http_url" {
            return Ok(());
    }
    Err(ValidationError::new("invalid query type"))
}

pub fn create_query(query: web::Json<QueryRequest>) -> Result<HttpResponse, CreateRejected> {
    query.validate()?;
    let path = "./sugarcube.db";
    let conn = Connection::open(&path)?;
    conn.execute(
        "INSERT INTO queries (type, term) VALUES (?1, ?2)",
        params![query.query_type, query.query_term],
    )?;
    Ok(HttpResponse::Created().finish())
}
