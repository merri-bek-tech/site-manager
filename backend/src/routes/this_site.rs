use rocket::post;
use rocket::serde::json::Json;
use rocket::serde::{Deserialize, Serialize};
use rocket::Route;
use rocket_db_pools::Connection;

use crate::infra::db::MainDb;

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
struct Site {
    name: String,
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct CreateSiteDetails {
    name: String,
}

#[post("/create", data = "<data>")]
async fn create(mut db: Connection<MainDb>, data: Json<CreateSiteDetails>) -> Json<Site> {
    sqlx::query!("SELECT * FROM site_configs WHERE id = 0")
        .fetch_one(&mut **db)
        .await
        .ok();

    Json(Site {
        name: data.name.clone(),
    })
}

#[get("/", format = "json")]
async fn show() -> Json<Site> {
    Json(Site {
        name: "foobar".to_string(),
    })
}

pub fn routes() -> Vec<Route> {
    routes![create, show]
}
