use rocket::serde::json::Json;
use rocket::serde::{Deserialize, Serialize};
use rocket::Route;
use thiserror::Error;

#[derive(sqlx::FromRow, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct NodeDetails {
    pub public_key: String,
}

#[derive(Debug, Error, Responder)]
pub enum ThisNodeError {}

#[get("/", format = "json")]
async fn show() -> Result<Json<NodeDetails>, ThisNodeError> {
    let dummy_details = NodeDetails {
        public_key: "xxx".to_string(),
    };

    Ok(Json(dummy_details))
}

pub fn routes() -> Vec<Route> {
    routes![show]
}
