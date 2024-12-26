use rocket::post;
use rocket::serde::json::Json;
use rocket::serde::Deserialize;
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
async fn create(mut db: Connection<MainDb>, data: Json<CreateSiteDetails>) -> Json<Site> {
    let repo = ThisSiteRepo::init();
    let _result = repo.create_site(&mut db, data.name.clone()).await.unwrap();

    Json(Site {
        id: "1".to_string(),
        name: "foobar".to_string(),
    })
}

#[get("/", format = "json")]
async fn show(mut db: Connection<MainDb>) -> Json<Site> {
    let repo = ThisSiteRepo::init();
    let site = repo.get_site(&mut db).await.unwrap();

    Json(site)
}

pub fn routes() -> Vec<Route> {
    routes![create, show]
}
