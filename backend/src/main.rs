use rocket::tokio::task::spawn;
use rocket::tokio::time::{sleep, Duration};
use aquadoggo::{Configuration, Node};
use p2panda_rs::identity::KeyPair;

#[macro_use] extern crate rocket;

#[cfg(test)] mod tests;

#[get("/")]
fn hello() -> String {
    "OK".to_string()
}

#[launch]
#[rocket::main]
async fn rocket() -> _ {
    spawn(async {
        let config = Configuration::default();
        let key_pair = KeyPair::new();
        let node = Node::start(key_pair, config).await;
        node.on_exit().await;
        node.shutdown().await;
    });

    rocket::build()
        .mount("/", routes![hello])
}
