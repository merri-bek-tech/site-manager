use rocket::post;
use rocket::serde::json::Json;
use rocket::Route;
use rocket_db_pools::Connection;

use crate::infra::db::MainDb;
use crate::repos::entities::Region;
use crate::repos::this_region::{CreateRegionData, ThisRegionError, ThisRegionRepo};

#[post("/create", data = "<data>")]
async fn create(mut db: Connection<MainDb>, data: Json<CreateRegionData>) -> Result<Json<Region>, ThisRegionError> {
    let repo = ThisRegionRepo::init();

    repo.create_region(&mut db, data.into_inner())
        .await
        .map(|region| Json(region))
}

pub fn routes() -> Vec<Route> {
    routes![create]
}
