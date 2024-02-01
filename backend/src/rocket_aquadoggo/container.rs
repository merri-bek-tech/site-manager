use std::sync::{Mutex, Arc};
use aquadoggo::{Configuration, Node};
use p2panda_rs::identity::KeyPair;
use rocket::{serde::{Serialize, Deserialize}, tokio};
// use env_logger::WriteStyle;
// use log::LevelFilter;

#[derive(Serialize, Deserialize, PartialEq)]
#[serde(crate = "rocket::serde")]
pub enum NodeStatus {
    Running,
    Offline,
}

#[derive(Default)]
pub struct AquadoggoContainer {
    pub node: Arc<Mutex<Option<Node>>>,
}

impl AquadoggoContainer {
    pub fn status(&self) -> NodeStatus {
        let node_lock = self.node.lock().unwrap();

        if node_lock.is_some() {
            println!("Aquadoggo: Checking status of node - it is running");
            NodeStatus::Running
        } else {
            println!("Aquadoggo: Checking status of node - it is offline");
            NodeStatus::Offline
        }
    }

    pub async fn start_node(&self, config: Configuration, key_pair: KeyPair) {
        if self.status() == NodeStatus::Running {
            panic!("Aquadoggo: Node already running");
        }

        let node_copy = self.node.clone();

        tokio::spawn(async move {
            println!("Aquadoggo: Starting tokio spawn");

            println!("Aquadoggo: Starting node");
            let node = Node::start(key_pair, config).await;
            println!("Aquadoggo: Node started");

            // assign the node to the container
            let mut node_lock = node_copy.lock().unwrap();
            *node_lock = Some(node);

            // // take another node copy
            // let node_copy = node_copy.clone();

            // // wait for the node to exit
            // let node_lock = node_copy.lock().unwrap();
            // node.on_exit().await;
            // println!("Aquadoggo: Node exited");

            // node.shutdown().await;
            // println!("Aquadoggo: Node shutdown");
        });
    }

    pub async fn shutdown_node(&self) {
        // Take the Node out of self
        let mut node_lock = self.node.lock().unwrap();
        let node = node_lock.take();

        // shutdown the node
        if node.is_some() {
            println!("Aquadoggo: Shutting down node");

            // spawn a tokio thread to shutdown the node
            tokio::spawn(async move {
                node.unwrap().shutdown().await;
                println!("Aquadoggo: Node shutdown");
            });
        } else {
            println!("Aquadoggo: Node is already offline");
        }
    }

    // fn clear_node(&self) {
    //     println!("Aquadoggo: Clearing node");
    //     self.set_node(None);
    // }

    // fn set_node(&self, maybe_node: Option<Node>) {
    //     let mut node_lock = self.node.lock().unwrap();
    //     //*node_lock = maybe_node;

    //     if maybe_node.is_some() {
    //         println!("Aquadoggo: Setting node");
    //         node_lock.replace(maybe_node.unwrap());
    //     } else {
    //         println!("Aquadoggo: Clearing node");
    //         node_lock.take();
    //     }
    // }

    // fn get_node(&self) -> Option<Node> {
    //     // let mut node_lock = self.node.lock().unwrap();

    //     // Some(node_lock.unwrap()
    // }
}

