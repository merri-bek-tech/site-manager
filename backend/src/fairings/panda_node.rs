use std::sync::Mutex;
use aquadoggo::{Configuration, Node};
use p2panda_rs::identity::KeyPair;
use rocket::{Rocket, Orbit};
use rocket::fairing::{Fairing, Info, Kind};

#[derive(Default)]
pub struct PandaNode {
    node: Mutex<Option<Node>>,
}

impl PandaNode {
    // This function is an implementation detail.
    async fn start_node(&self, config: Configuration, key_pair: KeyPair) {
        let maybe_node = self.get_node();
        if maybe_node.is_some() {
            panic!("Aquadoggo: Node already running");
        }

        println!("Aquadoggo: Starting node");
        let node = Node::start(key_pair, config).await;
        println!("Aquadoggo: Node started");
        self.set_node(Some(node));
    }

    async fn shutdown_node(&self) {
        let maybe_node = self.get_node();

        if maybe_node.is_some() {
            println!("Aquadoggo: About to shutdown node");
            maybe_node.unwrap().shutdown().await;
            self.clear_node();
            println!("Aquadoggo: Node shutdown");
        }
    }

    fn clear_node(&self) {
        self.set_node(None);
    }

    fn set_node(&self, maybe_node: Option<Node>) {
        let mut node_lock = self.node.lock().unwrap();
        *node_lock = maybe_node;
    }

    fn get_node(&self) -> Option<Node> {
        let mut node_lock = self.node.lock().unwrap();
        node_lock.take()
    }
}

#[rocket::async_trait]
impl Fairing for PandaNode {
    fn info(&self) -> Info {
        Info {
            name: "PandaNode",
            kind: Kind::Liftoff | Kind::Shutdown | Kind::Singleton,
        }
    }

    async fn on_liftoff(&self, _rocket: &Rocket<Orbit>) {
        let config: Configuration = Default::default();
        let key_pair = KeyPair::new();

        self.start_node(config, key_pair).await;
    }

    async fn on_shutdown(&self, _rocket: &Rocket<Orbit>) {
        println!("Fairing: on_shutdown");

        self.shutdown_node().await;
    }
}