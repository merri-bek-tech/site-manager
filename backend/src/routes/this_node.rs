use rocket::serde::json::Json;
use rocket::serde::{Deserialize, Serialize};
use rocket::{Route, State};
use thiserror::Error;

use crate::panda_comms::container::P2PandaContainer;

#[derive(sqlx::FromRow, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct NodeDetails {
    pub public_key: String,
}

#[derive(Debug, Error, Responder)]
pub enum ThisNodeError {}

#[get("/", format = "json")]
async fn show(panda_container: &State<P2PandaContainer>) -> Result<Json<NodeDetails>, ThisNodeError> {
    let public_key: String = panda_container
        .get_public_key()
        .unwrap()
        .to_string();

    let dummy_details = NodeDetails { public_key };

    Ok(Json(dummy_details))
}

pub fn routes() -> Vec<Route> {
    routes![show]
}
