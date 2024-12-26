use infra::spa_server::SpaServer;
use panda_comms::container::P2PandaContainer;
use panda_comms::fairing::P2PandaCommsFairing;
use rocket::fairing::{self, AdHoc};
use rocket::fs::{FileServer, Options};
use rocket::response::Redirect;
use rocket::serde::Deserialize;

mod infra;
mod panda_comms;
mod routes;

#[macro_use]
extern crate rocket;

#[cfg(test)]
mod tests;

use rocket::{Build, Rocket};
use rocket_db_pools::{sqlx, Database};

#[derive(Database)]
#[database("main_db")]
struct MainDb(sqlx::SqlitePool);

#[get("/")]
fn hello() -> String {
    "OK".to_string()
}

#[get("/")]
fn admin_redirect() -> Redirect {
    Redirect::to("/admin")
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct Config {
    frontend_asset_path: String,
}

#[launch]
#[rocket::main]
async fn rocket() -> _ {
    let mut rocket = rocket::build();
    let config: Config = rocket.figment().extract().expect("config");

    // log the config
    println!("Config static_asset_path: {:?}", config.frontend_asset_path);

    // state
    rocket = rocket.manage(P2PandaContainer::default());

    // fairings
    rocket = rocket
        .attach(infra::cors::cors_fairing())
        .attach(MainDb::init())
        .attach(AdHoc::try_on_ignite("DB Migrations", run_migrations))
        .attach(P2PandaCommsFairing::default());

    // frontend
    if !config.frontend_asset_path.is_empty() {
        rocket = rocket
            .mount(
                "/admin/assets",
                FileServer::from(config.frontend_asset_path.clone() + "/assets").rank(3),
            )
            .mount(
                "/admin",
                SpaServer::new(
                    config.frontend_asset_path.clone() + "/index.html",
                    Options::IndexFile,
                ),
            )
    }

    // routes
    rocket
        .mount("/", routes![admin_redirect])
        .mount("/hello", routes![hello])
        .mount("/api/this_site", routes::this_site::routes())
        .mount("/api/apps", routes::apps::routes())
}

async fn run_migrations(rocket: Rocket<Build>) -> fairing::Result {
    if let Some(db) = MainDb::fetch(&rocket) {
        println!("Running DB migrations");

        // run migrations using `db`. get the inner type with &db.0.
        sqlx::migrate!("./migrations")
            .run(&db.0)
            .await
            .expect("Error running DB migrations");

        Ok(rocket)
    } else {
        Err(rocket)
    }
}
