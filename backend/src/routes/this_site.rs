use rocket::post;
use rocket::serde::json::Json;
use rocket::serde::Deserialize;
use rocket::Route;
use rocket_db_pools::Connection;

use crate::infra::db::MainDb;
use crate::repos::entities::Site;
use crate::repos::this_site::{ThisSiteError, ThisSiteRepo};

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct CreateSiteDetails {
    name: String,
}

#[post("/create", data = "<data>")]
async fn create(mut db: Connection<MainDb>, data: Json<CreateSiteDetails>) -> Result<Json<Site>, ThisSiteError> {
    let repo = ThisSiteRepo::init();

    repo.create_site(&mut db, data.name.clone())
        .await
        .map(|site| Json(site))
}

#[get("/", format = "json")]
async fn show(mut db: Connection<MainDb>) -> Result<Json<Site>, ThisSiteError> {
    let repo = ThisSiteRepo::init();

    repo.get_site(&mut db)
        .await
        .map(|site| Json(site))
}

pub fn routes() -> Vec<Route> {
    routes![create, show]
}
