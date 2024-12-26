use rocket::post;
use rocket::serde::json::Json;
use rocket::serde::{Deserialize, Serialize};
use rocket::Route;
use rocket_db_pools::Connection;

use crate::infra::db::MainDb;
use crate::repos::entities::Site;
use crate::repos::this_site::ThisSiteRepo;

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct CreateSiteDetails {
    name: String,
}

#[post("/create", data = "<data>")]
async fn create(db: Connection<MainDb>, data: Json<CreateSiteDetails>) -> Json<Site> {
    // let repo = ThisSiteRepo::init(db);
    // sqlx::query!("INSERT INTO site_configs (name) VALUES (?)", data.name)
    //     .await
    //     .ok();
    let repo = ThisSiteRepo::init();
    let site = repo.create_site(db, data.name.clone()).await.unwrap();

    Json(Site {
        id: "1".to_string(),
        name: "foobar".to_string(),
    })
}

#[get("/", format = "json")]
async fn show(db: Connection<MainDb>) -> Json<Site> {
    let repo = ThisSiteRepo::init();
    let site = repo.get_site(db).await.unwrap();

    Json(site)
}

pub fn routes() -> Vec<Route> {
    routes![create, show]
}
