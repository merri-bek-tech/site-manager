use rocket::post;
use rocket::serde::json::Json;
use rocket::serde::{Deserialize, Serialize};
use rocket::Route;

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
async fn create(data: Json<CreateSiteDetails>) -> Json<Site> {
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
