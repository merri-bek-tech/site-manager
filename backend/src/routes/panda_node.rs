use aquadoggo::Configuration;
use p2panda_rs::identity::KeyPair;
use rocket::{Route, State};
use rocket::serde::json::Json;
use rocket::serde::{Serialize, Deserialize};
use crate::rocket_aquadoggo::container::{AquadoggoContainer, NodeStatus};

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
struct NodeState {
  status: NodeStatus,
}

#[get("/status", format = "json")]
fn status(aquadoggo_container: &State<AquadoggoContainer>) -> Json<NodeState> {
    Json(NodeState {
        status: aquadoggo_container.status(),
    })
}

#[post("/stop", format = "json")]
async fn stop(aquadoggo_container: &State<AquadoggoContainer>) -> Json<NodeState> {
    println!("stopping");
    aquadoggo_container.shutdown_node().await;
    println!("stopped");

    Json(NodeState {
        status: aquadoggo_container.status(),
    })
}

#[post("/start", format = "json")]
async fn start(aquadoggo_container: &State<AquadoggoContainer>) -> Json<NodeState> {
    let config: Configuration = Default::default();
    let key_pair = KeyPair::new();

    aquadoggo_container.start_node(config, key_pair).await;

    Json(NodeState {
        status: aquadoggo_container.status(),
    })
}

pub fn routes() -> Vec<Route> {
    routes![status, stop, start]
}