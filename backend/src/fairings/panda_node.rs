// use rocket::tokio::time::{sleep, Duration};
use aquadoggo::{Configuration, Node};
use p2panda_rs::identity::KeyPair;
use rocket::tokio::task::spawn;
use rocket::{Rocket, Request, Data, Response, Orbit};
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

    async fn on_liftoff(&self, rocket: &Rocket<Orbit>) {
        spawn(async {
            let config = Configuration::default();
            let key_pair = KeyPair::new();
            let node = Node::start(key_pair, config).await;
            node.on_exit().await;
            node.shutdown().await;
        });
    }

    async fn on_request(&self, req: &mut Request<'_>, data: &mut Data<'_>) {
        /* ... */
    }

    async fn on_response<'r>(&self, req: &'r Request<'_>, res: &mut Response<'r>) {
        /* ... */
    }

    async fn on_shutdown(&self, rocket: &Rocket<Orbit>) {
        /* ... */
    }
}