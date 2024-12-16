use rocket::post;
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
struct CreateSiteData {
    slug: String,
}

#[post("/create", data = "<data>")]
async fn create(data: Json<CreateSiteData>) -> Json<Site> {
    Json(Site {
        slug: data.slug.clone(),
    })
}

#[get("/", format = "json")]
async fn show() -> Json<Site> {
    Json(Site {
        slug: "slug".to_string(),
    })
}

pub fn routes() -> Vec<Route> {
    routes![create, show]
}
