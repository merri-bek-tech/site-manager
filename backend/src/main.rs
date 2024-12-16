use infra::spa_server::SpaServer;
use rocket::fs::{FileServer, Options};
use rocket::response::Redirect;

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

#[get("/")]
fn admin_redirect() -> Redirect {
    Redirect::to("/admin")
}

#[launch]
#[rocket::main]
async fn rocket() -> _ {
    rocket::build()
        .attach(infra::cors::cors_fairing())
        .mount("/", routes![admin_redirect])
        .mount(
            "/admin/assets",
            FileServer::from("../frontend/dist/assets").rank(3),
        )
        .mount(
            "/admin",
            SpaServer::new("../frontend/dist/index.html", Options::IndexFile),
        )
        .mount("/hello", routes![hello])
        .mount("/api/this_site", routes::this_site::routes())
        .mount("/api/apps", routes::apps::routes())
}
