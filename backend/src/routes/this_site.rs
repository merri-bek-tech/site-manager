use rocket::serde::json::Json;
use rocket::serde::{Deserialize, Serialize};
use rocket::Route;

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
struct Site {
    slug: String,
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct NameSite {
    slug: String,
}

#[post("/create", format = "json", data = "<params>")]
async fn create(params: Json<NameSite>) -> Json<Site> {
    Json(Site {
        slug: "slug".to_string(),
    })
}

pub fn routes() -> Vec<Route> {
    routes![create]
}
