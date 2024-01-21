use std::path::PathBuf;

// use rocket::tokio::time::{sleep, Duration};
use aquadoggo::{Configuration, Node, AllowList, NetworkConfiguration};
use p2panda_rs::identity::KeyPair;
use rocket::tokio::task::spawn;
use rocket::{Rocket, Orbit};
use rocket::fairing::{Fairing, Info, Kind};

#[derive(Default)]
pub struct PandaNode {

}

#[rocket::async_trait]
impl Fairing for PandaNode {
    fn info(&self) -> Info {
        Info {
            name: "PandaNode",
            kind: Kind::Liftoff | Kind::Singleton,
        }
    }

    // async fn on_ignite(&self, rocket: Rocket<Build>) -> fairing::Result {
    //     /* ... */
    // }

    async fn on_liftoff(&self, _rocket: &Rocket<Orbit>) {
        // instead of the above, build the configuration not using a builder or default
        let config = Configuration {
            allow_schema_ids: AllowList::Wildcard,
            database_url: "sqlite::memory:".into(),
            database_max_connections: 32,
            http_port: 2020,
            blobs_base_path: PathBuf::new(),
            worker_pool_size: 16,
            network: NetworkConfiguration::default(),
        };

        let key_pair = KeyPair::new();

        spawn(async {
            println!("P2Panda: Starting node");
            let node = Node::start(key_pair, config).await;
            println!("P2Panda: Node started");
            node.on_exit().await;
            println!("P2Panda: Node exited");
            node.shutdown().await;
            println!("P2Panda: Node shutdown");
        });
    }

    // async fn on_request(&self, req: &mut Request<'_>, data: &mut Data<'_>) {
    //     /* ... */
    // }

    // async fn on_response<'r>(&self, req: &'r Request<'_>, res: &mut Response<'r>) {
    //     /* ... */
    // }

    // async fn on_shutdown(&self, rocket: &Rocket<Orbit>) {
    //     /* ... */
    // }
}