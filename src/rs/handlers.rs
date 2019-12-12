use actix_web::{
    web,
    HttpResponse,
    http::StatusCode,
    error::ResponseError
};
use serde::Deserialize;
use rusqlite::{params, Connection, Error as SqliteError, ErrorCode};
use validator::{Validate, ValidationError, ValidationErrors};

#[derive(Deserialize, Debug, Validate)]
pub struct QueryRequest {
    #[validate(url(message = "term %s is not a valid URL"))]
    #[serde(rename = "term")]
    query_term: String,
    #[validate(custom = "validate_query_type")]
    #[serde(rename = "type")]
    query_type: String,
}

#[derive(Fail, Debug)]
pub enum CreateRejected {
    #[fail(display = "{}.", _0)]
    QueryExists(String),
    #[fail(display = "{}.", _0)]
    ValidationError(String),
    #[fail(display = "{}.", _0)]
    DatastoreError(String),
    #[fail(display = "Internal error.")]
    InternalError,
}

impl ResponseError for CreateRejected {
    fn error_response(&self) -> HttpResponse {
        match *self {
            CreateRejected::QueryExists(_) => HttpResponse::new(StatusCode::CONFLICT),
            CreateRejected::ValidationError(_) => HttpResponse::new(StatusCode::BAD_REQUEST),
            CreateRejected::DatastoreError(_) => HttpResponse::new(StatusCode::INTERNAL_SERVER_ERROR),
            CreateRejected::InternalError => HttpResponse::new(StatusCode::INTERNAL_SERVER_ERROR),
        }
    }
}

impl From<SqliteError> for CreateRejected {
    fn from(error: SqliteError) -> Self {
        match error {
            SqliteError::SqliteFailure(ref e, Some(ref s)) => {
                error!("{:?} -> {:?}", e, s.to_string());
                match e.code {
                    ErrorCode::ConstraintViolation => CreateRejected::QueryExists(s.to_string()),
                    _ => CreateRejected::DatastoreError(s.to_string()),
                }
            },
            _ => CreateRejected::InternalError,
        }

    }
}

impl From<ValidationErrors> for CreateRejected {
    fn from(error: ValidationErrors) -> Self {
        let validation_errors = error
            .field_errors()
            .iter()
            .map(|(&k, &v)| v.iter().map(|e| format!("`{}` fails to validate as {}", k, e.code.to_string())).collect())
            .collect::<Vec<String>>()
            .join(", ");
        CreateRejected::ValidationError(validation_errors)
    }
}

fn validate_query_type(query_type: &str) -> Result<(), ValidationError> {
    if query_type == "facebook_post" ||
        query_type == "youtube_video" ||
        query_type == "youtube_channel" ||
        query_type == "twitter_tweet" ||
        query_type == "twitter_user" ||
        query_type == "http_url" {
            return Ok(());
    }
    Err(ValidationError::new("valid query type"))
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
