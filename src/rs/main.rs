use actix_web::{web, App, HttpServer};

mod handlers;

use crate::handlers::create_query;

fn main() {
    HttpServer::new(|| {
        App::new()
            .route("/", web::post().to(create_query))
    })
        .bind("127.0.0.1:8000")
        .expect("Can not bind to port 8000")
        .run()
        .unwrap();
}
