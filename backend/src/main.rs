use rocket::fs::FileServer;

mod infra;
mod routes;

#[macro_use]
extern crate rocket;

#[cfg(test)]
mod tests;

#[get("/")]
fn hello() -> String {
    "OK".to_string()
}

#[launch]
#[rocket::main]
async fn rocket() -> _ {
    rocket::build()
        .attach(infra::cors::cors_fairing())
        .mount("/assets", FileServer::from("/home/jade/assets"))
        .mount("/", routes![hello])
        .mount("/this_site", routes::this_site::routes())
        .mount("/apps", routes::apps::routes())
}
