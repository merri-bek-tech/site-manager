use aquadoggo::Configuration;
use p2panda_rs::identity::KeyPair;
use rocket::fairing::{Fairing, Info, Kind};
use rocket::{Orbit, Rocket};

use crate::rocket_aquadoggo::container::AquadoggoContainer;

#[derive(Default)]
pub struct AquadoggoFairing {}

#[rocket::async_trait]
impl Fairing for AquadoggoFairing {
    fn info(&self) -> Info {
        Info {
            name: "AquadoggoFairing",
            kind: Kind::Liftoff | Kind::Shutdown | Kind::Singleton,
        }
    }

    async fn on_liftoff(&self, rocket: &Rocket<Orbit>) {
        let container = rocket.state::<AquadoggoContainer>();

        let config: Configuration = Default::default();
        let key_pair = KeyPair::new();

        println!("Aquadoggo: About to start node");
        container.unwrap().start_node(config, key_pair).await;
    }

    async fn on_shutdown(&self, _rocket: &Rocket<Orbit>) {
        // let maybe_container = rocket.state::<AquadoggoContainer>();

        // if let Some(container) = maybe_container {
        //     println!("Aquadoggo: About to shutdown node");
        //     container.shutdown_node().await;
        // }
    }
}
