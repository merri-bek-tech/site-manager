use std::sync::Mutex;
use std::time::Duration;
use aquadoggo::{Configuration, Node};
use p2panda_rs::identity::KeyPair;
use rocket::tokio::task::spawn;
use rocket::tokio::time::sleep;
use rocket::{Rocket, Orbit, tokio};
use rocket::fairing::{Fairing, Info, Kind};
use tokio_util::sync::CancellationToken;

#[derive(Default)]
pub struct PandaNode {
    cancellation_token: Mutex<Option<CancellationToken>>,
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

        let token = CancellationToken::new();
        let mut token_lock = self.cancellation_token.lock().unwrap();
        *token_lock = Some(token.clone());

        println!("About to spawn node");

        spawn(async move {
            println!("Aquadoggo: Starting node");
            let node = Node::start(key_pair, config).await;

            tokio::select! {
                _ = token.cancelled() => {
                    println!("Aquadoggo: Token cancelled, about to shutdown Aquadoggo");
                    node.shutdown().await;
                    println!("Aquadoggo: Node shutdown");                }
                _ = node.on_exit() => {
                    println!("Aquadoggo: on_exit has completed")
                }
            }
        });
    }

    async fn on_shutdown(&self, _rocket: &Rocket<Orbit>) {
        println!("Fairing: on_shutdown");
        {
            let mut token_lock = self.cancellation_token.lock().unwrap();
            if let Some(token) = token_lock.take() {
                token.cancel();
            }
        }
        sleep(Duration::from_secs(2)).await;
    }
}