use std::sync::Mutex;
use rocket_aquadoggo::aquadoggo_fairing::AquadoggoContainer;

mod routes;
mod infra;
mod rocket_aquadoggo;

#[macro_use] extern crate rocket;

#[cfg(test)] mod tests;

#[get("/")]
fn hello() -> String {
    "OK".to_string()
}

#[launch]
#[rocket::main]
async fn rocket() -> _ {
    rocket::build()
        .attach(infra::cors::cors_fairing())
        .attach(AquadoggoContainer::default())
        .manage(AquadoggoContainer { node: Mutex::new(None) })
        .mount("/", routes![hello])
        .mount("/panda", routes::panda_node::routes())
}
