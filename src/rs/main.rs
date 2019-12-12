#[macro_use] extern crate failure_derive;
#[macro_use] extern crate log;
#[macro_use] extern crate validator_derive;
use actix_web::{web, App, HttpServer, middleware::Logger};
use actix_cors::Cors;

mod handlers;

use crate::handlers::create_query;

fn main() {
    std::env::set_var("RUST_LOG", "error,actix_web=info");
    env_logger::init();

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .wrap(Cors::default())
            .service(
                web::resource("/")
                    .route(web::post().to(create_query))
            )
    })
        .bind("127.0.0.1:8000")
        .expect("Can not bind to port 8000")
        .run()
        .unwrap();
}
