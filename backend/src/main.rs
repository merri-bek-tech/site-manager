
mod routes;
mod fairings;

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
        .attach(fairings::cors::cors_fairing())
        .attach(fairings::panda_node::PandaNode::default())
        .mount("/", routes![hello])
        .mount("/panda", routes::panda_node::routes())
}
